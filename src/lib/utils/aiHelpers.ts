import { OpenAI } from "langchain/llms/openai";
import { HfInference } from "@huggingface/inference";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { BaseLanguageModel } from "langchain/base_language";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "langchain/schema/runnable";
import { z } from "zod";
import { env } from "@/lib/config/env";

// Initialize HuggingFace client
const hf = new HfInference(env.HUGGINGFACE_API_KEY);

// Initialize models with fallback strategy
const initializeAIModel = async (
  preferredProvider: "langchain" | "huggingface" = "langchain"
): Promise<BaseLanguageModel | HfInference> => {
  try {
    if (preferredProvider === "langchain") {
      return new OpenAI({
        modelName: "gpt-4",
        temperature: 0.7,
        maxTokens: 2000,
        openAIApiKey: env.OPENAI_API_KEY,
      });
    } else {
      return hf;
    }
  } catch (error) {
    console.error(`Error initializing ${preferredProvider} model:`, error);
    // Fallback to the other provider
    return initializeAIModel(
      preferredProvider === "langchain" ? "huggingface" : "langchain"
    );
  }
};

// Generic content generation with structured output
export async function generateStructuredContent<T extends z.ZodType>(
  prompt: string,
  outputSchema: T,
  options: {
    provider?: "langchain" | "huggingface";
    templateVariables?: Record<string, string>;
  } = {}
) {
  try {
    const model = await initializeAIModel(options.provider);
    const parser = StructuredOutputParser.fromZodSchema(outputSchema);

    const promptTemplate = new PromptTemplate({
      template: `
        Instructions: Generate content based on the following prompt.
        Provide the output in the following format:
        {format_instructions}
        
        Prompt: {prompt}
        
        Additional Context: {context}
      `,
      inputVariables: ["prompt", "context"],
      partialVariables: {
        format_instructions: parser.getFormatInstructions(),
      },
    });

    const chain = RunnableSequence.from([promptTemplate, model, parser]);

    const response = await chain.invoke({
      prompt,
      context: options.templateVariables
        ? JSON.stringify(options.templateVariables)
        : "No additional context provided.",
    });

    return response as z.infer<T>;
  } catch (error) {
    console.error("Error generating structured content:", error);
    throw error;
  }
}

// Content analysis with LangChain
export async function analyzeContent(
  content: string,
  analysisType: "sentiment" | "keywords" | "topics" | "summary"
) {
  try {
    const model = await initializeAIModel();
    const analysisPrompts = {
      sentiment:
        "Analyze the sentiment of the following content. Return a score between -1 and 1:",
      keywords: "Extract the main keywords from the following content:",
      topics: "Identify the main topics discussed in the following content:",
      summary: "Provide a concise summary of the following content:",
    };

    const chain = new LLMChain({
      llm: model,
      prompt: new PromptTemplate({
        template: `${analysisPrompts[analysisType]}\n\n{content}`,
        inputVariables: ["content"],
      }),
    });

    const result = await chain.call({
      content,
    });

    return result.text;
  } catch (error) {
    console.error("Error analyzing content:", error);
    throw error;
  }
}

// Content enhancement with hybrid approach
export async function enhanceContent(
  content: string,
  enhancementType: "expand" | "rephrase" | "optimize" | "localize",
  options?: {
    targetLength?: number;
    targetTone?: string;
    targetLocale?: string;
  }
) {
  try {
    // Use both models for better results
    const langchainModel = await initializeAIModel("langchain");
    const huggingfaceModel = await initializeAIModel("huggingface");

    // First pass with LangChain
    const initialChain = new LLMChain({
      llm: langchainModel,
      prompt: new PromptTemplate({
        template: `
          Enhance the following content using the ${enhancementType} approach.
          ${
            options?.targetLength
              ? `Target length: ${options.targetLength} words`
              : ""
          }
          ${options?.targetTone ? `Target tone: ${options.targetTone}` : ""}
          ${
            options?.targetLocale
              ? `Target locale: ${options.targetLocale}`
              : ""
          }
          
          Content: {content}
        `,
        inputVariables: ["content"],
      }),
    });

    const initialResult = await initialChain.call({ content });

    // Second pass with HuggingFace for refinement
    const refinementChain = new LLMChain({
      llm: huggingfaceModel,
      prompt: new PromptTemplate({
        template:
          "Refine and improve the following content while maintaining its core message:\n\n{content}",
        inputVariables: ["content"],
      }),
    });

    const finalResult = await refinementChain.call({
      content: initialResult.text,
    });

    return finalResult.text;
  } catch (error) {
    console.error("Error enhancing content:", error);
    throw error;
  }
}

// Example usage with Zod schema
export const contentSchema = z.object({
  title: z.string(),
  content: z.string(),
  metadata: z.object({
    keywords: z.array(z.string()),
    readingTime: z.number(),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  }),
});

// Export type for TypeScript usage
export type GeneratedContent = z.infer<typeof contentSchema>;

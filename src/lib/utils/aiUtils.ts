import { OpenAI } from "@langchain/openai";
import { HfInference } from "@huggingface/inference";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { BaseLanguageModel } from "@langchain/core/language_models/base";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";
import { env } from "@/lib/config/env";

// Initialize HuggingFace client
const hf = new HfInference(env.HUGGINGFACE_API_KEY);

// Initialize OpenAI model
const initializeOpenAI = async () => {
  return new OpenAI({
    modelName: "gpt-4",
    temperature: 0.7,
    maxTokens: 2000,
    openAIApiKey: env.OPENAI_API_KEY,
  });
};

// Content generation templates
const blogOutlineTemplate = new PromptTemplate({
  template: `Create a detailed blog outline for an article about {topic}. 
  Consider the following aspects:
  - Current trends and relevance
  - Key points to cover
  - Supporting arguments
  - Potential conclusions`,
  inputVariables: ["topic"],
});

const videoScriptTemplate = new PromptTemplate({
  template: `Create a video script about {topic} that is engaging and viral-worthy.
  Consider:
  - Hook (first 5 seconds)
  - Main points
  - Call to action
  - Optimal length for {platform}`,
  inputVariables: ["topic", "platform"],
});

// AI Task orchestration
export async function generateBlogOutline(topic: string) {
  try {
    const model = await initializeOpenAI();
    const chain = new LLMChain({
      llm: model,
      prompt: blogOutlineTemplate,
    });

    const result = await chain.call({
      topic,
    });

    return result.text;
  } catch (error) {
    console.error("Error generating blog outline:", error);
    throw error;
  }
}

export async function generateVideoScript(topic: string, platform: string) {
  try {
    const model = await initializeOpenAI();
    const chain = new LLMChain({
      llm: model,
      prompt: videoScriptTemplate,
    });

    const result = await chain.call({
      topic,
      platform,
    });

    return result.text;
  } catch (error) {
    console.error("Error generating video script:", error);
    throw error;
  }
}

// Content enhancement with hybrid approach
export async function generateEnhancedContent(topic: string) {
  try {
    const model = await initializeOpenAI();
    // Generate initial content with OpenAI
    const initialChain = new LLMChain({
      llm: model,
      prompt: new PromptTemplate({
        template: "Generate initial content about {topic}",
        inputVariables: ["topic"],
      }),
    });

    const initialContent = await initialChain.call({ topic });

    // Enhance with HuggingFace
    const enhancedContent = await hf.textGeneration({
      model: "gpt2",
      inputs: initialContent.text,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7,
      },
    });

    return enhancedContent.generated_text;
  } catch (error) {
    console.error("Error in hybrid content generation:", error);
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

import { env } from "@/lib/config/env";
import { HfInference } from "@huggingface/inference";
import { OpenAI } from "langchain/llms/openai";

export async function checkEnvSetup() {
  const results = {
    openai: false,
    huggingface: false,
    firebase: false,
    clerk: false,
    deepgram: false,
  };

  try {
    // Test OpenAI connection
    const openai = new OpenAI({
      modelName: "gpt-4",
      temperature: 0,
      maxTokens: 5,
      openAIApiKey: env.OPENAI_API_KEY,
    });
    await openai.call("test");
    results.openai = true;
  } catch (error) {
    console.error("OpenAI connection failed:", error);
  }

  try {
    // Test HuggingFace connection
    const hf = new HfInference(env.HUGGINGFACE_API_KEY);
    await hf.textGeneration({
      model: "gpt2",
      inputs: "test",
      parameters: {
        max_new_tokens: 5,
      },
    });
    results.huggingface = true;
  } catch (error) {
    console.error("HuggingFace connection failed:", error);
  }

  // Check Firebase configuration
  results.firebase = Boolean(
    env.FIREBASE_API_KEY &&
      env.FIREBASE_AUTH_DOMAIN &&
      env.FIREBASE_PROJECT_ID &&
      env.FIREBASE_STORAGE_BUCKET &&
      env.FIREBASE_MESSAGING_SENDER_ID &&
      env.FIREBASE_APP_ID
  );

  // Check Clerk configuration
  results.clerk = Boolean(
    env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && env.CLERK_SECRET_KEY
  );

  // Check Deepgram configuration
  results.deepgram = Boolean(env.DEEPGRAM_API_KEY);

  return {
    success: Object.values(results).every(Boolean),
    results,
    message: generateSetupMessage(results),
  };
}

function generateSetupMessage(results: Record<string, boolean>): string {
  const messages: string[] = [];

  if (!results.openai) {
    messages.push("❌ OpenAI setup failed - Check your OPENAI_API_KEY");
  }
  if (!results.huggingface) {
    messages.push(
      "❌ HuggingFace setup failed - Check your HUGGINGFACE_API_KEY"
    );
  }
  if (!results.firebase) {
    messages.push(
      "❌ Firebase configuration incomplete - Check your Firebase environment variables"
    );
  }
  if (!results.clerk) {
    messages.push(
      "❌ Clerk configuration incomplete - Check your Clerk environment variables"
    );
  }
  if (!results.deepgram) {
    messages.push("❌ Deepgram setup failed - Check your DEEPGRAM_API_KEY");
  }

  if (messages.length === 0) {
    return "✅ All services are properly configured!";
  }

  return messages.join("\n");
}

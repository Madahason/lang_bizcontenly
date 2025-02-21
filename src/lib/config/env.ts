import { z } from "zod";

const envSchema = z.object({
  // AI Provider API Keys
  OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
  HUGGINGFACE_API_KEY: z.string().min(1, "HuggingFace API key is required"),
  ANTHROPIC_API_KEY: z.string().min(1, "Anthropic API key is required"),
  REPLICATE_API_KEY: z.string().min(1, "Replicate API key is required"),

  // Firebase Configuration
  FIREBASE_API_KEY: z
    .string()
    .min(1, "AIzaSyBYJ6Vot7HwQvLFaTGvZbczHFBP4rAkZyQ"),
  FIREBASE_AUTH_DOMAIN: z.string().min(1, "bizcontently.firebaseapp.com"),
  FIREBASE_PROJECT_ID: z.string().min(1, "bizcontently"),
  FIREBASE_STORAGE_BUCKET: z
    .string()
    .min(1, "bizcontently.firebasestorage.app"),
  FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, "680519501740"),
  FIREBASE_APP_ID: z
    .string()
    .min(1, "1:680519501740:web:2ee93fec59e4cc4147dc09"),

  // Clerk Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, "Clerk publishable key is required"),
  CLERK_SECRET_KEY: z.string().min(1, "Clerk secret key is required"),

  // Deepgram Configuration
  DEEPGRAM_API_KEY: z
    .string()
    .min(1, "bdf4cd977950dfa334034a96627656035462e23a"),

  // Application Configuration
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  try {
    const env = envSchema.parse({
      // AI Provider API Keys
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
      REPLICATE_API_KEY: process.env.REPLICATE_API_KEY,

      // Firebase Configuration
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,

      // Clerk Authentication
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

      // Deepgram Configuration
      DEEPGRAM_API_KEY: process.env.DEEPGRAM_API_KEY,

      // Application Configuration
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    });

    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .map((issue) => issue.path.join("."))
        .join(", ");
      throw new Error(
        `❌ Invalid environment variables: ${missingVars}\n${error.message}`
      );
    }
    throw new Error("❌ Unknown error validating environment variables");
  }
}

export const env = validateEnv();

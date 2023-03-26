import { z } from "zod";
import { config } from "dotenv";

config();

const server = z.object({
  APP_URL: z.string().url().optional(),
  DATABASE_URL: z.string().url(),
  PORT: z.number().int().positive().optional(),
});

const processEnv = {
  APP_URL: process.env.APP_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: Number(process.env.PORT),
};

const env = process.env as unknown as z.infer<typeof server>;

const parsed = server.safeParse(processEnv);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

export { env };

import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { createContext } from "./context";
import { appRouter } from "./api/root";
import { env } from "./config/env";

const server = Fastify({
  maxParamLength: 5000,
  logger: true,
});

server.register(cors, {
  origin: [
    "http://localhost:3000",
    "http://localhost:4173",
    "http://localhost:5173",
    env.APP_URL ?? "",
  ],
});

server.register(fastifyTRPCPlugin, {
  prefix: "/api/trpc",
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await server.listen({ host: "0.0.0.0", port: env.PORT ?? 5000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();

import Fastify, { FastifyReply, FastifyRequest } from "fastify";
// import fastifyJwt, { FastifyJWTOptions } from "@fastify/jwt";
import swagger from "@fastify/swagger";
import { withRefResolver } from "fastify-zod";

import userRoutes from "./modules/user/user.route";
import postRoutes from "./modules/post/post.route";
import { userSchemas } from "./modules/user/user.schema";
import { postSchemas } from "./modules/post/post.schema";

import { version } from "../package.json";

export const server = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

server.register(require("@fastify/jwt"), {
  secret: process.env.JWT_SECRET,
});

server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.send(err);
    }
  }
);

/**
 * Register schemas
 * @see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 */
for (const schema of [...userSchemas, ...postSchemas]) {
  server.addSchema(schema);
}

server.register(
  swagger,
  withRefResolver({
    routePrefix: "/docs",
    exposeRoute: true,
    staticCSP: true,
    openapi: {
      info: {
        title: "Fastify API",
        description: "API for some posts",
        version,
      },
    },
  })
);

/**
 * Register routes
 * @see https://www.fastify.io/docs/latest/Routes/
 */
server.register(userRoutes, { prefix: "api/users" });
server.register(postRoutes, { prefix: "api/posts" });

/**
 * Run the server!
 */
const start = async () => {
  try {
    await server.listen({ port: 3000, host: "0.0.0.0" });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;

    console.info(`Server listening at http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

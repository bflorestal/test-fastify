import { FastifyInstance } from "fastify";
import { createPostHandler, getProductsHandler } from "./post.controller";
import { $ref } from "./post.schema";

export default async function postRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createPostSchema"),
        response: {
          201: $ref("postResponseSchema"),
        },
      },
    },
    createPostHandler
  );

  server.get(
    "/",
    {
      schema: {
        response: {
          200: $ref("postsResponseSchema"),
        },
      },
    },
    getProductsHandler
  );
}

import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePostInput } from "./post.schema";
import { createPost, getPosts } from "./post.service";

export async function createPostHandler(
  request: FastifyRequest<{ Body: CreatePostInput }>
) {
  const post = await createPost({
    ...request.body,
    authorId: request.user.id,
  });

  return post;
}

export async function getProductsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const products = await getPosts();

  return products;
}

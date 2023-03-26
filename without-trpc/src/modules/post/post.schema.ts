import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const postInput = {
  title: z.string(),
  content: z.string(),
};

const postGenerated = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const createPostSchema = z.object({
  ...postInput,
});

const postResponseSchema = z.object({
  ...postInput,
  ...postGenerated,
});

const postsResponseSchema = z.array(postResponseSchema);

export type CreatePostInput = z.infer<typeof createPostSchema>;

export const { schemas: postSchemas, $ref } = buildJsonSchemas(
  {
    createPostSchema,
    postResponseSchema,
    postsResponseSchema,
  },
  { $id: "PostSchema" }
);

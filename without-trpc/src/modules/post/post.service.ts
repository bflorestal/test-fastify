import prisma from "../../utils/prisma";
import { CreatePostInput } from "./post.schema";

export async function createPost(data: CreatePostInput & { authorId: number }) {
  return prisma.post.create({
    data,
  });
}

export async function getPosts() {
  return prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

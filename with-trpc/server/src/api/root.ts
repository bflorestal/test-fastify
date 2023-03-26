import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { exampleRouter } from "./routers/example";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/api/root";

export const trpc = createTRPCReact<AppRouter>();

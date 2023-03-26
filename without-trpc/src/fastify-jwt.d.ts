import "@fastify/jwt";
import { CreateUserInput } from "./modules/user/user.schema";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number }; // payload type is used for signing and verifying
    user: CreateUserInput; // user type is return type of `request.user` object
  }
}

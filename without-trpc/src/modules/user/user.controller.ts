import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "../../app";
import { verifyPassword } from "../../utils/hash";
import type { CreateUserInput, LoginInput } from "./user.schema";
import { createUser, findUserByEmail, findUsers } from "./user.service";

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err);
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  // find a user by email
  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }

  // verify password
  const correctPassword = await verifyPassword(
    body.password,
    user.passwordHash
  );

  if (correctPassword) {
    const { passwordHash: password, ...rest } = user;

    // generate access token
    return { accessToken: server.jwt.sign(rest) };
  }

  return reply.code(401).send({
    message: "Invalid email or password",
  });
}

export async function getUsersHandler() {
  const users = await findUsers();

  return users;
}

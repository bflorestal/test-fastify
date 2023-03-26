# (With tRPC) Server

This is my first time trying to use tRPC. I decided to use it with a Fastify server.

## Setup

You should set the environment variables in the `.env` file. You can use the `.env.example` file as a template.

**Note:** I wanted to try using [Zod](https://zod.dev) to validate the environment variables (like with the T3 stack), so I created a `env.ts` in the `src/config` folder.
It should be updated with the environment variables you want to use.

Since it's not a real project, I decided to set some of them as optional. You can change it to your needs.

---

Then, use your favorite package manager to install the dependencies:

```bash
npm install

# or
yarn install

# or
pnpm install
```

## Run

**Note:** I'm using [tsx](https://github.com/esbuild-kit/tsx), so I don't need to build the project before running it, or to use `ts-node`.

```bash
npm start

# or
yarn start

# or
pnpm start
```

## Resources used

- [Fastify](https://www.fastify.io)
- [tRPC - Usage with Fastify](https://trpc.io/docs/server/adapters/fastify)
- [Create T3 App - Environment Variables](https://create.t3.gg/en/usage/env-variables)

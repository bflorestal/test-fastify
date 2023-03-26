FROM node:18-alpine AS deps

WORKDIR /app

COPY . .

RUN npm install


FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=deps /app .

CMD ["npm", "start"]
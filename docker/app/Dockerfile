FROM node:20.9.0

WORKDIR /app

COPY app/ .

RUN npm ci

RUN npx prisma generate

CMD ["npm", "run", "dev"]
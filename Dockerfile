FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl && \
    rm -rf /var/lib/apt/lists/*

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["npm", "start"]

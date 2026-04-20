FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# 🔥 IMPORTANT: generate prisma for linux
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
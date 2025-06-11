FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install  # <-- Install inside container

COPY . .

EXPOSE 4000

CMD ["node", "app.js"]

# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copia package.json e package-lock.json/yarn.lock
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código
COPY . .

# Build do frontend
RUN npm run build

# Etapa 2: Servir os arquivos construídos
FROM node:20-alpine

WORKDIR /app

# Instala serve globalmente
RUN npm install -g serve

# Copia arquivos build do estágio anterior
COPY --from=build /app/dist /app/dist

# Exponha porta padrão
EXPOSE 3000

# Comando de start
CMD ["serve", "-s", "dist", "-l", "3000"]

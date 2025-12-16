# Minimal Dockerfile for GHCR publish placeholder
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm i
COPY . .
RUN npm run build || true
CMD ["node", "dist/bundle.js"]
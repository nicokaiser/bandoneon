FROM node:20-slim as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1-alpine
LABEL maintainer="Nico Kaiser <nico@kaiser.me>"
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./docker/default.conf /etc/nginx/conf.d

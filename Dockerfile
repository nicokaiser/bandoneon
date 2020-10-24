FROM node:14-slim as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1-alpine
LABEL maintainer="Nico Kaiser <nico@kaiser.me>" \
    org.label-schema.name="bandoneon" \
    org.label-schema.description="A little JavaScript application that wants to help learning the Alfred Arnold 142 bandoneon." \
    org.label-schema.url="https://bandoneon.app/" \
    org.label-schema.vcs-url="https://github.com/nicokaiser/bandoneon" \
    org.label-schema.vendor="Nico Kaiser" \
    org.label-schema.schema-version="1.0"
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./docker/default.conf /etc/nginx/conf.d

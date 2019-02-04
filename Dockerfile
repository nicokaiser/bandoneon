FROM nginx:1-alpine

LABEL maintainer="nico@kaiser.me"

COPY index.html /usr/share/nginx/html/
COPY favicon.ico /usr/share/nginx/html/
COPY dist /usr/share/nginx/html/dist

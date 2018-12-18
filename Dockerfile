FROM nginx:1-alpine

COPY index.html /usr/share/nginx/html/
COPY favicon.ico /usr/share/nginx/html/
COPY dist /usr/share/nginx/html/dist

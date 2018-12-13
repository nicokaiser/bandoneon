FROM nginx:stable-alpine

COPY index.html /usr/share/nginx/html/
COPY favicon.ico /usr/share/nginx/html/
COPY dist /usr/share/nginx/html/dist
COPY download /usr/share/nginx/html/download

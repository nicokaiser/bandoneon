FROM nginx:1-alpine

LABEL maintainer="Nico Kaiser <nico@kaiser.me>" \
    org.label-schema.name="bandoneon" \
    org.label-schema.description="A little JavaScript application that wants to help learning the Alfred Arnold 142 bandoneon." \
    org.label-schema.url="https://bandoneon.app/" \
    org.label-schema.vcs-url="https://github.com/nicokaiser/bandoneon" \
    org.label-schema.vendor="Nico Kaiser" \
    org.label-schema.schema-version="1.0"

COPY index.html /usr/share/nginx/html/
COPY favicon.ico /usr/share/nginx/html/
COPY dist /usr/share/nginx/html/dist

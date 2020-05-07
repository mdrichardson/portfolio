# Backend
FROM node:12.2.0-alpine as backend

WORKDIR /server

ENV PATH /server/node_modules/.bin:$PATH

COPY ./server /server

# Frontend
FROM node:12.2.0-alpine as frontend

WORKDIR /portfolio

ENV PATH /portfolio/node_modules/.bin:$PATH

COPY ./portfolio/ /portfolio/

RUN npm install --no-optional; \
    npm rebuild node-sass --force; \
    npm run build; \
    npm cache clean --force

# Nginx
FROM nginx:stable-alpine

EXPOSE 443
EXPOSE 80

RUN apk add --update --no-cache ca-certificates npm nodejs python g++ make && rm -rf /var/cache/apk/*

COPY --from=backend /server /server
COPY --from=frontend /portfolio/public /usr/share/nginx/html

ENV NODE_ENV=production
ENV VIRTUAL_HOST=mdrichardson.net
ENV LETSENCRYPT_HOST=mdrichardson.net

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/servers /etc/nginx/conf.d/
COPY ./certs/mdrichardson.net /etc/letsencrypt/live/mdrichardson.net

COPY ./start.sh /start.sh

CMD ["sh", "/start.sh"]

# TODO: Add Letsencrypt
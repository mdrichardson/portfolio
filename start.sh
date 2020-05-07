#!/usr/bin/env bash

# backend
cd /server
npm install --no-optional
npm cache clean --force
node /server/portfolio-server & \
# nginx
nginx -g 'daemon off;'

# docker kill portfolio & docker build --rm -t portfolio . & docker run -p 4430:443 -p 8000:80 --name portfolio --rm portfolio
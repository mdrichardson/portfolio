@echo off

if not exist ./server/jwtRS256.key goto NotExist
if not exist ./server/private.js goto NotExist
if not exist ./server/ssl/server.crt goto NotExist
if not exist ./server/ssl/server.key goto NotExist

set /p tag="Docker image tag: "
echo Building and pushing %tag%
docker build --rm -t %tag% . & docker push %tag% 
docker build --rm -t %tag% . & docker push %tag%

exit

:NotExist
echo Required file is missing 
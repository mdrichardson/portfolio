@echo off

set /p tag="Docker image tag: "
echo Building and pushing %tag%
docker build --rm -t %tag% . & docker push %tag%
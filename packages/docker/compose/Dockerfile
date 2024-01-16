FROM node AS build

MAINTAINER Kaseem

COPY . .

RUN npm i rollup -g
RUN rollup -c

FROM nginx:latest
MAINTAINER Kaseem

COPY --from=build /nginx.conf /etc/nginx/nginx.conf
COPY --from=build /dist /dist

EXPOSE 80

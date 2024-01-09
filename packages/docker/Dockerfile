FROM nginx

MAINTAINER Kaseem

RUN echo '这是一个本地构建的nginx镜像' > /usr/share/nginx/html/index.html

RUN mkdir /usr/share/nginx/html/testCopy

COPY /testCopy/* /usr/share/nginx/html/testCopy

EXPOSE 80

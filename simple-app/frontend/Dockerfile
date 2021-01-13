FROM nginx:latest
WORKDIR /etc/nginx/conf.d
COPY default.conf default.conf
WORKDIR /usr/share/nginx/html
COPY $PwD/contact-app/build .
EXPOSE 80
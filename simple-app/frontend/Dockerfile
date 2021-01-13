# first building react project, using node base image
FROM node:10 as build-stage
# setting working dir inside container
WORKDIR /react-app
# required to install packages
COPY $PWD/contact-app-v1/package*.json ./
# installing npm packages
RUN npm install
# copying over react source material
COPY $PWD/contact-app-v1/src ./src
# copying over further react material
COPY $PWD/contact-app-v1/public ./public
# copying over our nginx config file
COPY default.conf ./
# creating production build to serve through nginx
RUN npm run build


# starting second, nginx build-stage
FROM nginx:1.15
# removing default nginx config file
RUN rm /etc/nginx/conf.d/default.conf
# copying our nginx config
COPY --from=build-stage /react-app/default.conf /etc/nginx/conf.d/
# copying production build from last stage to serve through nginx
COPY --from=build-stage /react-app/build/ /usr/share/nginx/html
# exposing port 8080 on container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
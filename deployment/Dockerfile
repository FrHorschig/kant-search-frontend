# build angular app
FROM node:19 as build-step
WORKDIR /app
COPY . .
RUN npm run build

# create image for serving the app with nginx
FROM nginx:1.19.2-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./deployment/nginx.conf /etc/nginx/nginx.conf
COPY ./ssl/cert.pem /etc/ssl/certs
COPY ./ssl/cert.pem /etc/nginx/conf.d/
COPY ./ssl/key.pem /etc/nginx/conf.d/
COPY --from=build-step /app/dist/kant-search-frontend /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
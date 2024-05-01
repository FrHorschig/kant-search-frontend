FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./deployment/nginx.conf /etc/nginx/nginx.conf
COPY ./kant-search-frontend/* /usr/share/nginx/html

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

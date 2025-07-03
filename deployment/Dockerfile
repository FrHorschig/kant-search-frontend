FROM nginx:1.29.0
RUN rm /etc/nginx/conf.d/default.conf
COPY ./deployment/frontend.conf /etc/nginx/conf.d/default.conf
COPY ./kant-search-frontend/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]

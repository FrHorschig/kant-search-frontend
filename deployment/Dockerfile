FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./deployment/ksgui.conf /etc/nginx/ksgui.conf
COPY ./kant-search-frontend/* /usr/share/nginx/html

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]

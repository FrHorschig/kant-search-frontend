FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./deployment/ksgui.conf /etc/nginx/conf.d/default.conf
COPY ./kant-search-frontend/ /usr/share/nginx/html/

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]

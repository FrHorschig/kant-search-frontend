FROM nginx:1.31

LABEL org.opencontainers.image.title="kant-search-frontend"
LABEL org.opencontainers.image.source="https://github.com/FrHorschig/kant-search-frontend"
LABEL org.opencontainers.image.licenses="AGPL-3.0 license"

RUN rm /etc/nginx/conf.d/default.conf
COPY ./deployment/frontend.conf /etc/nginx/conf.d/default.conf
COPY ./dist/browser/ /usr/share/nginx/html/

COPY ./deployment/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

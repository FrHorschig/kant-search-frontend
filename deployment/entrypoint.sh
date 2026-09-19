#!/bin/sh
set -e

sed -i "s|__BASE_PATH__|${BASE_PATH}|g" \
    /usr/share/nginx/html/index.html

exec nginx -g 'daemon off;'

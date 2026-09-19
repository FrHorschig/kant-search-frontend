#!/bin/sh
set -e

sed -i "s|<base href=\"/\" />|<base href=\"/${BASE_PATH}\"|g" \
    /usr/share/nginx/html/index.html

exec nginx -g 'daemon off;'

#!/bin/sh
set -e

BASE_PATH="${BASE_PATH:-/}"

case "$BASE_PATH" in
    /*/) ;;
    /*) BASE_PATH="${BASE_PATH}/" ;;
    *) BASE_PATH="/${BASE_PATH}/" ;;
esac

sed -i "s|__BASE_PATH_:|${BASE_PATH}|g" \
    /usr/share/nginx/html/index.html

exec nginx -g 'daemon off;'

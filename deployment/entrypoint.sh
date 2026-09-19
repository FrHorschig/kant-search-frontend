#!/bin/sh
set -e

sed -i "s|base href=\"/\"|base href=\"/${BASE_PATH}/\"|" ../src/index.html

exec nginx -g 'daemon off;'

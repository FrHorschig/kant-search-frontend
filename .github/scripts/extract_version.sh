#!/bin/bash

PACKAGE_JSON_FILE="package.json"
if [ ! -f "$PACKAGE_JSON_FILE" ]; then
    echo "Error: $PACKAGE_JSON_FILE does not exist."
    exit 1
fi

echo "$(jq -r '.version' "$PACKAGE_JSON_FILE")"

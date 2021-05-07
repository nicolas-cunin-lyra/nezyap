#!/bin/sh
# Build the app before starting it to take into account env variables
if [[ "$REACT_APP_CATALOG_BACKEND_URL" != "http://catalog.backend.apps.poc.pandrieux.sattamax.com" ]]; then
  yarn build
fi
yarn run:build
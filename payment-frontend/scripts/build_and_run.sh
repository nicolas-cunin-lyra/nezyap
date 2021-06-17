#!/bin/sh
# Build the app before starting it to take into account env variables (if not default value)
if [[ "$REACT_APP_PAYMENT_BACKEND_URL" != "http://payment.backend.apps.test-openshift.benoit.sattamax.com" ]]; then
  yarn build
fi
yarn run:build
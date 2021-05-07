#!/usr/bin/env bash

# provide as arg the tag to use (local or v2 for instance)

docker push openshift-registry.apps.poc.pandrieux.sattamax.com/nezyap/catalog-backend:$1
docker push openshift-registry.apps.poc.pandrieux.sattamax.com/nezyap/catalog-frontend:$1
docker push openshift-registry.apps.poc.pandrieux.sattamax.com/nezyap/payment-backend:$1
docker push openshift-registry.apps.poc.pandrieux.sattamax.com/nezyap/payment-frontend:$1
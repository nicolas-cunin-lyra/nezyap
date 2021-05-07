#!/usr/bin/env bash

projects_to_build=('catalog-backend' 'catalog-frontend' 'payment-backend' 'payment-frontend')

for project in ${projects_to_build[@]}; do
  cd $project
  ./build-docker.sh
  cd ..
done
#!/usr/bin/env bash

projects_to_build=('catalog-backend' 'catalog-frontend' 'payment-backend' 'payment-frontend')

for project in ${projects_to_build[@]}; do
  cd $project
  sed -i 's/local/v2/g' build-docker.sh

  if [[ "$project" == *-frontend ]]; then
    sed -i 's/aliceblue/rgb(43, 134, 43)/g' src/index.css
    yarn build
  fi

  ./build-docker.sh

  cd ..
done

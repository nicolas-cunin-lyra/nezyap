#!/usr/bin/env bash

projects_to_build=('catalog-backend' 'catalog-frontend' 'payment-backend' 'payment-frontend')

for project in ${projects_to_build[@]}; do
  cd $project
  if [[ "$project" == *-frontend ]]; then
    echo "------------------------------"
    echo "--> Restoring background to blue in $project"
    echo "------------------------------"
    sed -i 's/rgb\(43, 134, 43\)/aliceblue/g' src/index.css
    yarn build
  fi

  echo "------------------------------"
  echo "--> Restoring docker TAG for local"
  echo "------------------------------"
  sed -i 's/v2/local/g' build-docker.sh

  echo "------------------------------"
  echo "--> Build docker image locally"
  echo "------------------------------"
  ./build-docker.sh

  cd ..
done

echo "------"
echo "--> Now, you can use the script:"
echo "             ./scripts/push-to-openshift-image-registry.sh local"
echo "------"
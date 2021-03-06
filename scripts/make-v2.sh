#!/usr/bin/env bash

projects_to_build=('catalog-backend' 'catalog-frontend' 'payment-backend' 'payment-frontend')

for project in ${projects_to_build[@]}; do
  cd $project
  if [[ "$project" == *-frontend ]]; then
    echo "------------------------------"
    echo "--> Changing background from blue to green in $project"
    echo "------------------------------"
    sed -i 's/aliceblue/rgb(43, 134, 43)/g' src/index.css
    yarn build
  fi

  echo "------------------------------"
  echo "--> Changing docker TAG for v2"
  echo "------------------------------"
  sed -i 's/local/v2/g' build-docker.sh

  echo "------------------------------"
  echo "--> Build docker image locally"
  echo "------------------------------"
  ./build-docker.sh

  cd ..
done

echo "------"
echo "--> Now, you can use the script:"
echo "             ./scripts/push-to-openshift-image-registry.sh v2"
echo "------"
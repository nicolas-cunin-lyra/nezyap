#!/usr/bin/env bash
yarn build
docker build . -t nezyap/catalog-backend
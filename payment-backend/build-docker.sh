#!/usr/bin/env bash
yarn build
docker build . -t nezyap/payment-backend
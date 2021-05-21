IMAGE_NAME = node:14-alpine

.PHONY: build
build:
        docker build -t $(IMAGE_NAME) .

.PHONY: test
test:
        docker build -t $(IMAGE_NAME)-candidate .
        IMAGE_NAME=$(IMAGE_NAME)-candidate test/run
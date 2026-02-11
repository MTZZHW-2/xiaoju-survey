PROJECT_NAME=survey-app
DOCKER_REGISTRY=xrcyjs
IMAGE=$(DOCKER_REGISTRY)/$(PROJECT_NAME)
VERSION=latest

build:
	@echo "正在构建镜像: $(IMAGE):$(VERSION)..."
	docker build -t $(IMAGE):$(VERSION) ./
	@echo "镜像构建成功: $(IMAGE):$(VERSION)"

up:
	@echo "正在启动服务栈..."
	docker-compose up -d
	@echo "服务已启动"

down:
	@echo "正在停止服务栈..."
	docker-compose down
	@echo "服务已停止"

.PHONY: build up down


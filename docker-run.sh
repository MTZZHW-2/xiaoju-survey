#! /bin/bash 

# 启动nginx
echo 'nginx start'
nginx -g 'daemon on;'

# 启动后端服务
cd /app/server
npm run start:prod
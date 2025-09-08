# 使用官方nginx镜像作为基础镜像
FROM nginx:alpine

# 删除默认的nginx配置和网站文件
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

# 复制网站文件到nginx默认目录
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY photo/ /usr/share/nginx/html/photo/

# 复制自定义nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口80
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
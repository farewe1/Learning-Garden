---
title: Docker 部署静态站点
date: 2026-06-05
category: 工程化
tags:
  - Docker
  - nginx
  - 部署
summary: 用 Docker 多阶段构建把 Vite 项目部署成 nginx 静态站点。
status: learning
---

## 部署目标

第一版不做后端，Vite 构建后只需要把 `dist` 目录交给 nginx 托管。

## 多阶段构建

Node 阶段负责安装依赖并构建，nginx 阶段只保留静态文件。这样镜像更小，也更贴近生产部署方式。

## 注意点

React Router 是前端路由，刷新 `/blog/react-state` 时 nginx 需要回退到 `index.html`，否则会出现 404。

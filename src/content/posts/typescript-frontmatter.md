---
title: 用 TypeScript 约束 Markdown 元数据
date: 2026-06-03
category: TypeScript
tags:
  - TypeScript
  - Markdown
  - 类型建模
summary: 为笔记 frontmatter 设计类型，让内容缺字段时尽早暴露。
status: learning
---

## 为什么需要类型

博客的每篇笔记都依赖 `title`、`date`、`category` 这些字段。没有类型约束时，字段写错很容易到页面里才发现。

## 当前设计

每篇笔记会解析成统一的 `Post`：

```ts
type PostStatus = 'learning' | 'done' | 'reviewing';
```

这样分类、标签、归档和热力图都可以复用同一份数据。

## 继续深入

后续可以把 Markdown 校验做得更严格，比如日期格式检查、分类白名单、重复 slug 检查。

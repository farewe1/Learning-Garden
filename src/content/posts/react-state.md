---
title: React 状态流转笔记
date: 2026-06-03
category: React
tags:
  - React
  - Hooks
  - 状态管理
summary: 记录 useState、组件状态和数据流动的基础理解。
status: reviewing
---

## 状态是什么

状态是组件在某一时刻记住的数据。用户输入、展开收起、筛选条件、当前主题，都可以是状态。

![React 状态流转图](/notes/react-state/state-flow.svg)

## 我现在的理解

React 组件应该尽量保持数据流清晰：父组件管理共享状态，子组件通过 props 接收数据，通过回调通知父组件变化。

```tsx
const [theme, setTheme] = useState('light');
```

这行代码看起来简单，但背后代表“页面可以根据状态重新渲染”。

## 待复习

- 多个组件共享状态时，什么时候提升状态？
- URL 参数、localStorage 和 React state 的边界是什么？

import { describe, expect, it } from 'vitest';
import {
  buildArchive,
  buildCategoryStats,
  buildHeatmap,
  chooseReviewPost,
  parsePost,
} from './content';
import type { Post } from './types';

const makePost = (overrides: Partial<Post>): Post => ({
  slug: 'sample',
  title: '示例笔记',
  date: '2026-06-01',
  category: 'React',
  tags: ['状态管理'],
  summary: '一篇示例笔记',
  status: 'learning',
  content: '正文',
  readingMinutes: 1,
  ...overrides,
});

describe('parsePost', () => {
  it('parses frontmatter and markdown content into a post', () => {
    const post = parsePost(
      '/src/content/posts/react-state.md',
      `---
title: React 状态学习
date: 2026-06-02
category: React
tags:
  - 状态管理
  - Hooks
summary: useState 和状态流转记录
status: reviewing
---

# 正文标题

这里是正文。`,
    );

    expect(post).toMatchObject({
      slug: 'react-state',
      title: 'React 状态学习',
      date: '2026-06-02',
      category: 'React',
      tags: ['状态管理', 'Hooks'],
      summary: 'useState 和状态流转记录',
      status: 'reviewing',
    });
    expect(post.content).toContain('# 正文标题');
    expect(post.readingMinutes).toBe(1);
  });

  it('throws a clear error when required frontmatter is missing', () => {
    expect(() =>
      parsePost(
        '/src/content/posts/missing-category.md',
        `---
title: 缺少分类
date: 2026-06-02
summary: 没有 category
---

正文`,
      ),
    ).toThrow('missing required frontmatter: category');
  });
});

describe('content aggregations', () => {
  const posts = [
    makePost({ slug: 'old-review', date: '2026-05-01', category: 'React', status: 'reviewing' }),
    makePost({ slug: 'new-learning', date: '2026-06-03', category: 'React', status: 'learning' }),
    makePost({ slug: 'ts-note', date: '2026-06-03', category: 'TypeScript', status: 'done' }),
    makePost({ slug: 'db-note', date: '2026-06-04', category: '数据库', status: 'done' }),
  ];

  it('groups posts by category with counts, latest date, and status counts', () => {
    expect(buildCategoryStats(posts)).toEqual([
      {
        category: 'React',
        count: 2,
        latestDate: '2026-06-03',
        statusCounts: { learning: 1, done: 0, reviewing: 1 },
      },
      {
        category: 'TypeScript',
        count: 1,
        latestDate: '2026-06-03',
        statusCounts: { learning: 0, done: 1, reviewing: 0 },
      },
      {
        category: '数据库',
        count: 1,
        latestDate: '2026-06-04',
        statusCounts: { learning: 0, done: 1, reviewing: 0 },
      },
    ]);
  });

  it('builds daily heatmap counts from post dates', () => {
    const heatmap = buildHeatmap(posts, new Date('2026-06-08T00:00:00'));
    const juneThird = heatmap.days.find((day) => day.date === '2026-06-03');
    const juneFourth = heatmap.days.find((day) => day.date === '2026-06-04');

    expect(juneThird).toMatchObject({ count: 2, level: 2 });
    expect(juneFourth).toMatchObject({ count: 1, level: 1 });
    expect(heatmap.maxCount).toBe(2);
  });

  it('builds a descending month archive', () => {
    expect(buildArchive(posts).map((month) => `${month.month}:${month.posts.length}`)).toEqual([
      '2026-06:3',
      '2026-05:1',
    ]);
  });

  it('chooses reviewing and older posts first for random review', () => {
    const chosen = chooseReviewPost(posts, () => 0);

    expect(chosen?.slug).toBe('old-review');
  });
});

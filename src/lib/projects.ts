export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  period: string;
  status: '构思中' | '开发中' | '已完成';
  summary: string;
  stack: string[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    title: 'Learning Garden',
    period: '2026',
    status: '开发中',
    summary: '用 Markdown、分类归档、学习热力图和 Docker 部署，把课程笔记整理成一个长期维护的个人学习花园。',
    stack: ['React', 'TypeScript', 'Vite', 'Docker', 'nginx'],
    links: [
      { label: '线上预览', href: '/' },
      { label: '部署笔记', href: '/blog/docker-nginx' },
    ],
  },
  {
    title: 'React 状态练习',
    period: '2026',
    status: '开发中',
    summary: '围绕 useState、组件通信和 UI 状态流转做的小练习，用来把 React 基础知识拆成可复习的实验。',
    stack: ['React', 'Hooks', 'CSS'],
    links: [{ label: '学习笔记', href: '/blog/react-state' }],
  },
  {
    title: 'TypeScript 内容模型实验',
    period: '2026',
    status: '已完成',
    summary: '为 Markdown frontmatter、分类、标签和热力图建立类型约束，减少内容维护时的隐性错误。',
    stack: ['TypeScript', 'Markdown', 'Vitest'],
    links: [{ label: '实现记录', href: '/blog/typescript-frontmatter' }],
  },
];

export function validateProjects(entries: Project[]) {
  for (const project of entries) {
    const missing = [
      !project.title && 'title',
      !project.summary && 'summary',
      project.stack.length === 0 && 'stack',
      project.links.length === 0 && 'links',
    ].filter(Boolean);

    if (missing.length > 0) {
      throw new Error(`${project.title || 'Untitled project'} missing required fields: ${missing.join(', ')}`);
    }
  }
}

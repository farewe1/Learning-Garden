import { Code2, Database, FolderKanban, Server, Sparkles, Wrench } from 'lucide-react';
import { Heatmap } from './Heatmap';
import { RandomReviewButton } from './RandomReviewButton';
import { heatmap, posts } from '../lib/posts';

const stacks = [
  {
    title: '前端基础',
    detail: 'HTML / CSS / JavaScript',
    icon: Code2,
  },
  {
    title: 'React 方向',
    detail: 'React / Hooks / Router',
    icon: Sparkles,
  },
  {
    title: '类型系统',
    detail: 'TypeScript / 数据建模',
    icon: Wrench,
  },
  {
    title: '服务端学习',
    detail: 'Node / API / 后端基础',
    icon: Server,
  },
  {
    title: '数据存储',
    detail: 'SQL / 数据库设计',
    icon: Database,
  },
  {
    title: '工程化部署',
    detail: 'Vite / Docker / nginx',
    icon: FolderKanban,
  },
];

export function TechStackRail() {
  return (
    <aside className="site-rail site-rail-left" aria-label="个人技术栈">
      <section className="rail-panel tech-rail-panel">
        <div className="rail-heading">
          <span className="eyebrow">Technical stack</span>
          <h2>个人技术栈</h2>
          <p>正在建立的学习坐标。</p>
        </div>
        <div className="tech-stack-grid rail-tech-list">
          {stacks.map((stack) => (
            <div className="tech-stack-item" key={stack.title}>
              <stack.icon size={18} />
              <div>
                <strong>{stack.title}</strong>
                <span>{stack.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

export function LearningPulseRail() {
  const reviewingCount = posts.filter((post) => post.status === 'reviewing').length;
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthCount = posts.filter((post) => post.date.startsWith(currentMonth)).length;

  return (
    <aside className="site-rail site-rail-right" aria-label="学习热力图和学习统计">
      <section className="rail-panel stats-rail-panel">
        <div className="rail-heading">
          <span className="eyebrow">Learning pulse</span>
          <h2>学习状态</h2>
        </div>
        <div className="hero-metrics rail-metrics" aria-label="学习统计">
          <span>
            <strong>{posts.length}</strong>
            篇笔记
          </span>
          <span>
            <strong>{monthCount}</strong>
            本月新增
          </span>
          <span>
            <strong>{reviewingCount}</strong>
            待复习
          </span>
        </div>
        <RandomReviewButton variant="secondary" />
      </section>
      <Heatmap data={heatmap} compact />
    </aside>
  );
}

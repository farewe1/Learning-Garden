import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../lib/projects';

export function ProjectsPage() {
  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="eyebrow">Projects</span>
        <h1>做过的项目</h1>
        <p>这里保留项目入口，用来展示每个项目的介绍、技术栈、线上地址和相关记录。</p>
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-card-top">
              <span className="project-period">{project.period}</span>
              <span className="status-pill tone-learning">{project.status}</span>
            </div>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <div className="project-stack">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="project-links">
              {project.links.map((link) =>
                link.href.startsWith('http') ? (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <Link key={link.href} to={link.href}>
                    {link.label}
                    <ArrowUpRight size={15} />
                  </Link>
                ),
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

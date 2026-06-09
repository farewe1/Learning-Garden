import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="page-section narrow empty-state">
      <Home size={32} />
      <h1>页面不存在</h1>
      <p>这个路径还没有内容，可以回到首页继续浏览学习记录。</p>
      <Link className="primary-action" to="/">
        回到首页
      </Link>
    </section>
  );
}

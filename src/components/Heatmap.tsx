import { Link } from 'react-router-dom';
import type { HeatmapData } from '../lib/types';

interface HeatmapProps {
  data: HeatmapData;
  compact?: boolean;
}

const weekdays = ['一', '三', '五'];

export function Heatmap({ data, compact = false }: HeatmapProps) {
  const visibleDays = compact ? data.days.slice(-182) : data.days;

  return (
    <section className={compact ? 'heatmap-section heatmap-section-compact' : 'section-block heatmap-section'}>
      <div className="section-heading compact">
        <span className="eyebrow">Writing heatmap</span>
        <h2>学习热力图</h2>
        <p>根据 Markdown 日期统计每天写了多少篇，同一天越多颜色越深。</p>
      </div>
      <div className="heatmap-wrap">
        <div className="weekday-labels" aria-hidden="true">
          {weekdays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="heatmap-grid" aria-label="最近 365 天学习热力图">
          {visibleDays.map((day) =>
            day.count > 0 ? (
              <Link
                key={day.date}
                to={`/archive?date=${day.date}`}
                className="heat-cell"
                data-level={day.level}
                title={`${day.date}：${day.count} 篇`}
                aria-label={`${day.date} 写了 ${day.count} 篇笔记`}
              />
            ) : (
              <span
                key={day.date}
                className="heat-cell"
                data-level={0}
                title={`${day.date}：0 篇`}
                aria-label={`${day.date} 没有笔记`}
              />
            ),
          )}
        </div>
      </div>
      <div className="heatmap-legend">
        <span>少</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span key={level} className="heat-cell" data-level={level} />
        ))}
        <span>多</span>
      </div>
    </section>
  );
}

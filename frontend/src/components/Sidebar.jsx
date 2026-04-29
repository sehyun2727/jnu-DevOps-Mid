import React from 'react';
import { CATEGORY_COLORS } from './Calendar';

const CATEGORIES = ['운동', '식단', '병원', '수면', '기타'];

function Sidebar({ schedules, onAddClick }) {
  const today = new Date();
  const todaySchedules = schedules.filter((s) => {
    const d = new Date(s.start_time);
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  });

  const todayStr = today.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const completed = todaySchedules.filter((s) => s.is_completed).length;

  return (
    <aside className="sidebar">
      <div className="sidebar-date">
        <span className="sidebar-today-label">오늘</span>
        <p className="sidebar-date-str">{todayStr}</p>
        {todaySchedules.length > 0 && (
          <p className="sidebar-progress">
            {completed} / {todaySchedules.length} 완료
          </p>
        )}
      </div>

      <div className="sidebar-section">
        <h4 className="sidebar-section-title">오늘의 헬스케어</h4>
        {todaySchedules.length === 0 ? (
          <p className="sidebar-empty">오늘 일정이 없습니다</p>
        ) : (
          <ul className="sidebar-list">
            {todaySchedules.map((s) => (
              <li
                key={s.id}
                className={`sidebar-item ${s.is_completed ? 'done' : ''}`}
                style={{ borderLeftColor: CATEGORY_COLORS[s.category] || '#95a5a6' }}
              >
                <span
                  className="sidebar-cat"
                  style={{ color: CATEGORY_COLORS[s.category] || '#95a5a6' }}
                >
                  {s.category}
                </span>
                <span className="sidebar-title">{s.title}</span>
                <span className={`sidebar-status ${s.is_completed ? 'done' : ''}`}>
                  {s.is_completed ? '✓' : '●'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="sidebar-section">
        <h4 className="sidebar-section-title">카테고리</h4>
        <div className="legend">
          {CATEGORIES.map((cat) => {
            const count = schedules.filter((s) => s.category === cat).length;
            return (
              <div key={cat} className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: CATEGORY_COLORS[cat] }} />
                <span className="legend-name">{cat}</span>
                <span className="legend-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button className="btn-add-main" onClick={onAddClick}>
        + 새 스케줄 추가
      </button>
    </aside>
  );
}

export default Sidebar;

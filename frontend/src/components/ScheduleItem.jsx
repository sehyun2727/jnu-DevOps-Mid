import React from 'react';
import { CATEGORY_COLORS } from './Calendar';

function ScheduleItem({ schedule, onEdit, onDelete, onToggleComplete }) {
  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  const color = CATEGORY_COLORS[schedule.category] || '#95a5a6';

  return (
    <div className={`schedule-item ${schedule.is_completed ? 'completed' : ''}`} style={{ borderLeftColor: color }}>
      <div className="item-left">
        <span className="item-category" style={{ color, backgroundColor: color + '20' }}>
          {schedule.category}
        </span>
        <h4 className={`item-title ${schedule.is_completed ? 'strikethrough' : ''}`}>
          {schedule.title}
        </h4>
        {schedule.description && <p className="item-desc">{schedule.description}</p>}
        <div className="item-time">
          {formatTime(schedule.start_time)}
          {schedule.end_time && ` ~ ${formatTime(schedule.end_time)}`}
        </div>
      </div>
      <div className="item-actions">
        <button
          className={`btn-toggle ${schedule.is_completed ? 'undo' : 'complete'}`}
          onClick={() => onToggleComplete(schedule)}
          title={schedule.is_completed ? '미완료로 변경' : '완료로 변경'}
        >
          {schedule.is_completed ? '↺' : '✓'}
        </button>
        <button className="btn-edit-small" onClick={() => onEdit(schedule)} title="수정">
          ✏
        </button>
        <button className="btn-delete-small" onClick={() => onDelete(schedule.id)} title="삭제">
          ✕
        </button>
      </div>
    </div>
  );
}

export default ScheduleItem;

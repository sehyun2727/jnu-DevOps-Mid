import React from 'react';

function ScheduleItem({ schedule, onEdit, onDelete, onToggleComplete }) {
  const formatDateTime = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('ko-KR');
  };

  return (
    <div className={`schedule-item ${schedule.is_completed ? 'completed' : ''}`}>
      <div className="schedule-info">
        <h3>{schedule.title}</h3>
        {schedule.description && <p>{schedule.description}</p>}
        <span className="time">시작: {formatDateTime(schedule.start_time)}</span>
        {schedule.end_time && (
          <span className="time">종료: {formatDateTime(schedule.end_time)}</span>
        )}
        <span className={`status ${schedule.is_completed ? 'done' : 'pending'}`}>
          {schedule.is_completed ? '완료' : '진행중'}
        </span>
      </div>
      <div className="schedule-actions">
        <button className="btn-complete" onClick={() => onToggleComplete(schedule)}>
          {schedule.is_completed ? '미완료' : '완료'}
        </button>
        <button className="btn-edit" onClick={() => onEdit(schedule)}>
          수정
        </button>
        <button className="btn-delete" onClick={() => onDelete(schedule.id)}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default ScheduleItem;

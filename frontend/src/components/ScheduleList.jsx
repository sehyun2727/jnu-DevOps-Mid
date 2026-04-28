import React from 'react';
import ScheduleItem from './ScheduleItem';

function ScheduleList({ schedules, onEdit, onDelete, onToggleComplete }) {
  if (schedules.length === 0) {
    return <p className="empty-message">등록된 스케줄이 없습니다.</p>;
  }

  return (
    <div className="schedule-list">
      <h2>스케줄 목록 ({schedules.length}개)</h2>
      {schedules.map((schedule) => (
        <ScheduleItem
          key={schedule.id}
          schedule={schedule}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}

export default ScheduleList;

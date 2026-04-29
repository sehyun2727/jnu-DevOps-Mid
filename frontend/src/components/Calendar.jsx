import React, { useState } from 'react';

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const CATEGORY_COLORS = {
  '운동': '#27ae60',
  '식단': '#e67e22',
  '병원': '#e74c3c',
  '수면': '#3498db',
  '기타': '#95a5a6',
};

function Calendar({ schedules, selectedDate, onSelectDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));
  const goToday = () => {
    setCurrentMonth(new Date());
    onSelectDate(new Date());
  };

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getSchedulesForDay = (day) => {
    return schedules.filter((s) => {
      const d = new Date(s.start_time);
      return (
        d.getFullYear() === year &&
        d.getMonth() === month &&
        d.getDate() === day
      );
    });
  };

  const isToday = (day) => {
    const t = new Date();
    return day === t.getDate() && month === t.getMonth() && year === t.getFullYear();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  const cells = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="calendar-card">
      <div className="calendar-nav">
        <button className="nav-btn" onClick={prevMonth}>‹</button>
        <div className="calendar-title-wrap">
          <h2 className="calendar-title">{year}년 {month + 1}월</h2>
          <button className="btn-today" onClick={goToday}>오늘</button>
        </div>
        <button className="nav-btn" onClick={nextMonth}>›</button>
      </div>

      <div className="calendar-grid">
        {DAYS.map((d, i) => (
          <div key={d} className={`cal-header ${i === 0 ? 'sun' : i === 6 ? 'sat' : ''}`}>
            {d}
          </div>
        ))}
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} className="cal-cell empty" />;
          const daySchedules = getSchedulesForDay(day);
          const col = (firstDayOfWeek + day - 1) % 7;
          return (
            <div
              key={day}
              className={`cal-cell ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''} ${col === 0 ? 'sun' : col === 6 ? 'sat' : ''}`}
              onClick={() => onSelectDate(new Date(year, month, day))}
            >
              <span className="day-num">{day}</span>
              <div className="day-dots">
                {daySchedules.slice(0, 3).map((s) => (
                  <span
                    key={s.id}
                    className="dot"
                    style={{ backgroundColor: CATEGORY_COLORS[s.category] || '#95a5a6' }}
                    title={s.title}
                  />
                ))}
                {daySchedules.length > 3 && (
                  <span className="dot-more">+{daySchedules.length - 3}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from '../components/Calendar';
import Sidebar from '../components/Sidebar';
import ScheduleForm from '../components/ScheduleForm';
import ScheduleItem from '../components/ScheduleItem';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function Home() {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/schedules/`);
      setSchedules(res.data);
    } catch (e) {
      console.error('스케줄 조회 실패:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleCreate = async (data) => {
    try {
      await axios.post(`${API_URL}/schedules/`, data);
      fetchSchedules();
      setShowForm(false);
    } catch (e) {
      console.error('스케줄 생성 실패:', e);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await axios.put(`${API_URL}/schedules/${id}`, data);
      fetchSchedules();
      setShowForm(false);
      setEditingSchedule(null);
    } catch (e) {
      console.error('스케줄 수정 실패:', e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/schedules/${id}`);
      fetchSchedules();
    } catch (e) {
      console.error('스케줄 삭제 실패:', e);
    }
  };

  const handleToggle = async (schedule) => {
    try {
      await axios.put(`${API_URL}/schedules/${schedule.id}`, {
        is_completed: !schedule.is_completed,
      });
      fetchSchedules();
    } catch (e) {
      console.error('상태 변경 실패:', e);
    }
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEditingSchedule(null);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSchedule(null);
  };

  const selectedDaySchedules = selectedDate
    ? schedules.filter((s) => {
        const d = new Date(s.start_time);
        return (
          d.getFullYear() === selectedDate.getFullYear() &&
          d.getMonth() === selectedDate.getMonth() &&
          d.getDate() === selectedDate.getDate()
        );
      })
    : [];

  const selectedDateStr = selectedDate?.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="layout">
      <Sidebar schedules={schedules} onAddClick={handleAddClick} />

      <div className="main-content">
        {loading ? (
          <p className="loading">로딩 중...</p>
        ) : (
          <>
            <Calendar
              schedules={schedules}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />

            <div className="day-detail">
              <h3 className="day-detail-title">{selectedDateStr}</h3>
              {selectedDaySchedules.length === 0 ? (
                <p className="empty-message">이 날 등록된 스케줄이 없습니다.</p>
              ) : (
                <div className="schedule-list">
                  {selectedDaySchedules.map((s) => (
                    <ScheduleItem
                      key={s.id}
                      schedule={s}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleComplete={handleToggle}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={handleFormCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ScheduleForm
              onSubmit={
                editingSchedule
                  ? (data) => handleUpdate(editingSchedule.id, data)
                  : handleCreate
              }
              initialData={editingSchedule}
              defaultDate={selectedDate}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

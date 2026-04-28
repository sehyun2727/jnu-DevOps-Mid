import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleList from '../components/ScheduleList';
import ScheduleForm from '../components/ScheduleForm';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function Home() {
  const [schedules, setSchedules] = useState([]);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/schedules/`);
      setSchedules(response.data);
    } catch (error) {
      console.error('스케줄 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleCreate = async (scheduleData) => {
    try {
      await axios.post(`${API_URL}/schedules/`, scheduleData);
      fetchSchedules();
    } catch (error) {
      console.error('스케줄 생성 실패:', error);
    }
  };

  const handleUpdate = async (id, scheduleData) => {
    try {
      await axios.put(`${API_URL}/schedules/${id}`, scheduleData);
      setEditingSchedule(null);
      fetchSchedules();
    } catch (error) {
      console.error('스케줄 수정 실패:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/schedules/${id}`);
      fetchSchedules();
    } catch (error) {
      console.error('스케줄 삭제 실패:', error);
    }
  };

  const handleToggleComplete = async (schedule) => {
    try {
      await axios.put(`${API_URL}/schedules/${schedule.id}`, {
        is_completed: !schedule.is_completed,
      });
      fetchSchedules();
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };

  return (
    <div className="home">
      <ScheduleForm
        onSubmit={
          editingSchedule
            ? (data) => handleUpdate(editingSchedule.id, data)
            : handleCreate
        }
        initialData={editingSchedule}
        onCancel={() => setEditingSchedule(null)}
      />
      {loading ? (
        <p className="loading">로딩 중...</p>
      ) : (
        <ScheduleList
          schedules={schedules}
          onEdit={setEditingSchedule}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
}

export default Home;

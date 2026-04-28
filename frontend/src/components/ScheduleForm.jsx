import React, { useState, useEffect } from 'react';

function ScheduleForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    is_completed: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        start_time: initialData.start_time ? initialData.start_time.slice(0, 16) : '',
        end_time: initialData.end_time ? initialData.end_time.slice(0, 16) : '',
        is_completed: initialData.is_completed || false,
      });
    } else {
      setFormData({ title: '', description: '', start_time: '', end_time: '', is_completed: false });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      start_time: new Date(formData.start_time).toISOString(),
      end_time: formData.end_time ? new Date(formData.end_time).toISOString() : null,
    };
    onSubmit(submitData);
    if (!initialData) {
      setFormData({ title: '', description: '', start_time: '', end_time: '', is_completed: false });
    }
  };

  return (
    <form className="schedule-form" onSubmit={handleSubmit}>
      <h2>{initialData ? '스케줄 수정' : '새 스케줄 추가'}</h2>

      <div className="form-group">
        <label>제목 *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="스케줄 제목을 입력하세요"
          required
        />
      </div>

      <div className="form-group">
        <label>설명</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="설명을 입력하세요 (선택)"
        />
      </div>

      <div className="form-group">
        <label>시작 시간 *</label>
        <input
          type="datetime-local"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>종료 시간</label>
        <input
          type="datetime-local"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
        />
      </div>

      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            name="is_completed"
            checked={formData.is_completed}
            onChange={handleChange}
          />
          완료됨
        </label>
      </div>

      <div className="form-buttons">
        <button type="submit">{initialData ? '수정 완료' : '추가'}</button>
        {initialData && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            취소
          </button>
        )}
      </div>
    </form>
  );
}

export default ScheduleForm;

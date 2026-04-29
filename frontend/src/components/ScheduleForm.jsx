import React, { useState, useEffect } from 'react';
import { CATEGORY_COLORS } from './Calendar';

const CATEGORIES = ['운동', '식단', '병원', '수면', '기타'];

function toLocalDatetime(date) {
  if (!date) return '';
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function ScheduleForm({ onSubmit, initialData, defaultDate, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    is_completed: false,
    category: '기타',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        start_time: toLocalDatetime(initialData.start_time),
        end_time: initialData.end_time ? toLocalDatetime(initialData.end_time) : '',
        is_completed: initialData.is_completed || false,
        category: initialData.category || '기타',
      });
    } else {
      const base = defaultDate ? new Date(defaultDate) : new Date();
      base.setHours(9, 0, 0, 0);
      setFormData({
        title: '',
        description: '',
        start_time: toLocalDatetime(base),
        end_time: '',
        is_completed: false,
        category: '기타',
      });
    }
  }, [initialData, defaultDate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      start_time: new Date(formData.start_time).toISOString(),
      end_time: formData.end_time ? new Date(formData.end_time).toISOString() : null,
    });
  };

  return (
    <form className="schedule-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{initialData ? '스케줄 수정' : '새 스케줄 추가'}</h2>
        <button type="button" className="btn-close" onClick={onCancel}>✕</button>
      </div>

      <div className="form-group">
        <label>카테고리</label>
        <div className="category-buttons">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-btn ${formData.category === cat ? 'active' : ''}`}
              style={formData.category === cat ? { backgroundColor: CATEGORY_COLORS[cat], borderColor: CATEGORY_COLORS[cat] } : {}}
              onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>제목 *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="스케줄 제목"
          required
        />
      </div>

      <div className="form-group">
        <label>설명</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="상세 내용 (선택)"
          rows={2}
        />
      </div>

      <div className="form-row">
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
        <button type="submit" className="btn-submit">
          {initialData ? '수정 완료' : '추가'}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          취소
        </button>
      </div>
    </form>
  );
}

export default ScheduleForm;

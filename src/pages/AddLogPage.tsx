import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { AppHeader } from '../components/AppHeader';

const categories = ['Development', 'Testing', 'Support', 'Research', 'Exercise', 'Training'];

export const AddLogPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name: userName } = useUser();

  const queryParams = new URLSearchParams(location.search);
  const isEdit = queryParams.get('edit') === '1';
  const editCategory = queryParams.get('category') || categories[0];
  const editDate = queryParams.get('date') || new Date().toISOString().slice(0, 10);
  const cancelTo = isEdit ? `/calendar?user=${userName}` : '/';

  const [form, setForm] = useState({
    category: editCategory,
    duration: '',
    date: editDate,
    notes: ''
  });

  useEffect(() => {
    if (!userName) {
      navigate('/login');
    }
  }, [userName, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  if (!userName) return null;

  return (
    <div className="page-container" style={{ maxWidth: 500, margin: '0 auto' }}>
      <AppHeader />
      <h2>{isEdit ? 'Edit Log' : 'Add Log'}</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>User: {userName}</div>
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          name="duration"
          placeholder="Hours"
          value={form.duration}
          onChange={handleChange}
          required
        />
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <textarea
          name="notes"
          placeholder="Optional notes..."
          value={form.notes}
          onChange={handleChange}
          rows={3}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2rem' }}>
          <button
            type="button"
            onClick={() => navigate(cancelTo)}
            className="btn btn-secondary btn-full"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary btn-full">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

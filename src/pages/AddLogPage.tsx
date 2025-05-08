import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { AppHeader } from '../components/AppHeader';

const categories = ['Development', 'Testing', 'Support', 'Research', 'Exercise', 'Training'];

export const AddLogPage: React.FC = () => {
  const navigate = useNavigate();
  const { name: userName } = useUser();

  const [form, setForm] = useState({
    category: categories[0],
    duration: '',
    date: new Date().toISOString().slice(0, 10),
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
          marginBottom: '1rem'
        }}
      >
        <h2>Add Log</h2>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>

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
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: 'white',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

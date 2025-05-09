import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AppHeader } from '../components/AppHeader';
import { useUser } from '../context/UserContext';
import { logsByUser } from '../data';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
import { FaEdit } from 'react-icons/fa';
import '../App.css';

const categoryColors: Record<string, string> = {
  Development: '#007bff',
  Testing: '#28a745',
  Support: '#ffc107',
  Exercise: '#dc3545',
  Research: '#6610f2',
  Training: '#20c997'
};

export const CalendarPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userFromUrl = queryParams.get('user');

  const { name: loggedInUser } = useUser();
  const userName = userFromUrl || loggedInUser;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  if (!userName) return null;

  const dateStr = selectedDate.toISOString().slice(0, 10);
  const userLogs = logsByUser(userName) || [];
  const tasksForDate = userLogs.filter((log) => log.date === dateStr);

  const tileContent = ({ date }: { date: Date }) => {
    const dStr = date.toISOString().slice(0, 10);
    const tasks = userLogs.filter((log) => log.date === dStr);
    if (!tasks.length) return null;
    return (
      <div style={{ display: 'flex', gap: '2px', marginTop: '2px', justifyContent: 'center' }}>
        {tasks.map((task, i) => (
          <span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: categoryColors[task.category],
              display: 'inline-block'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="page-container" style={{ maxWidth: 600, margin: '0 auto' }}>
      <AppHeader />
      <div className="calendar-header">
        <div className="calendar-user-info">
          <Avatar name={userName} />
          <h2 style={{ margin: 0 }}>{userName}'s Calendar</h2>
        </div>
        <button onClick={() => setSelectedDate(new Date())}>Today</button>
      </div>

      <Calendar
        value={selectedDate}
        onChange={(date) => {
          if (date instanceof Date) {
            setSelectedDate(date);
          }
        }}
        tileContent={tileContent}
        className="full-width-calendar"
      />
      <div style={{ marginTop: '1.5rem' }}>
        <h3>Tasks on {dateStr}</h3>
        {tasksForDate.length === 0 && <p>No tasks logged for this day.</p>}
        {tasksForDate.map((task, i) => (
          <div
            key={i}
            style={{
              border: `2px solid ${categoryColors[task.category]}`,
              borderRadius: '6px',
              padding: '0.75rem',
              marginBottom: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <strong>{task.category}</strong> – {task.duration}h
              {task.notes && <p style={{ marginTop: '0.25rem' }}>{task.notes}</p>}
            </div>
            {userName === loggedInUser && (
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  color: '#007bff'
                }}
                title="Edit"
                onClick={() =>
                  navigate(
                    `/add?edit=1&date=${task.date}&category=${encodeURIComponent(task.category)}`
                  )
                }
              >
                <FaEdit />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

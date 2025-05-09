import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { mockedLogs } from './data';
import { UserJar } from './components/UserJar';
import { AddLogPage } from './pages/AddLogPage';
import { FAB } from './components/FAB';
import { LoginPage } from './pages/LoginPage';
import { UserProvider, useUser } from './context/UserContext';
import { AppHeader } from './components/AppHeader';
import { CalendarPage } from './pages/CalendarPage';

type Period = 'Today' | 'This Week' | 'This Month';

const isInRange = (date: string, start: Date, end: Date): boolean => {
  const d = new Date(date);
  return d >= start && d <= end;
};

const HomePage = () => {
  const [period, setPeriod] = useState<Period>('This Week');
  const [referenceDate, setReferenceDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const { name: userName } = useUser();

  const now = new Date(referenceDate);
  let startDate = new Date(now);
  if (period === 'This Week') startDate.setDate(now.getDate() - 6);
  if (period === 'This Month') startDate.setDate(now.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);

  const filteredLogs = mockedLogs.map((user) => {
    const logs = user.logs.filter((log) => isInRange(log.date, startDate, now));
    return { name: user.name, logs };
  });

  const totals = filteredLogs.map((u) => u.logs.reduce((sum, log) => sum + log.duration, 0));
  const maxTotal = Math.max(...totals, 1);

  return (
    <div className="page-container">
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '1rem'
        }}
      >
        <AppHeader />
      </header>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1rem'
        }}
      >
        {(['Today', 'This Week', 'This Month'] as Period[]).map((p) => (
          <button
            key={p}
            style={{
              padding: '0.5rem 1rem',
              background: p === period ? '#007bff' : '#fff',
              color: p === period ? '#fff' : '#000',
              border: '2px solid #007bff',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => setPeriod(p)}
          >
            {p}
          </button>
        ))}
        <input
          type="date"
          value={referenceDate}
          onChange={(e) => setReferenceDate(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        {userName && (
          <Link to="/add">
            <button
              style={{
                padding: '0.5rem 1rem',
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              + Add Log
            </button>
          </Link>
        )}
      </div>

      <div
        style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: '#444'
        }}
      >
        {period} — {startDate.toISOString().slice(0, 10)} → {now.toISOString().slice(0, 10)}
      </div>

      <div className="jar-grid">
        {filteredLogs.map((user, i) => (
          <UserJar
            key={user.name}
            name={user.name}
            logs={user.logs.reduce(
              (acc, log) => {
                const found = acc.find((e) => e.category === log.category);
                if (found) found.duration += log.duration;
                else acc.push({ category: log.category, duration: log.duration });
                return acc;
              },
              [] as { category: string; duration: number }[]
            )}
            total={totals[i]}
            maxTotal={maxTotal}
          />
        ))}
      </div>
      {userName && <FAB />}
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddLogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

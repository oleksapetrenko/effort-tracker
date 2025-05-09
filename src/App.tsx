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
import { calculateUserSummaries, findLeaderName, sortUsers } from './utils/leaderUtils';

type Period = 'Today' | 'This Week' | 'This Month';

const HomePage = () => {
  const [period, setPeriod] = useState<Period>('This Week');
  const [referenceDate, setReferenceDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const { name: userName } = useUser();

  const now = new Date(referenceDate);
  let startDate = new Date(now);
  if (period === 'This Week') startDate.setDate(now.getDate() - 6);
  if (period === 'This Month') startDate.setDate(now.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);

  const filteredSummaries = calculateUserSummaries(mockedLogs, startDate, now);
  const sortedSummaries = sortUsers(filteredSummaries, userName ?? undefined);
  const maxTotal = Math.max(...filteredSummaries.map((u) => u.total), 1);
  const leaderName = findLeaderName(filteredSummaries);

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
            <button className="btn btn-primary">+ Add Log</button>
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
        {sortedSummaries.map((user) => (
          <UserJar
            key={user.name}
            name={user.name}
            logs={user.logs}
            total={user.total}
            maxTotal={maxTotal}
            isLeader={user.name === leaderName}
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

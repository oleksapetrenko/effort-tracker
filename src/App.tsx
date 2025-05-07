import React, { useState } from 'react';
import { mockedLogs } from './data';
import { UserJar } from './components/UserJar';
import './components/UserJar.css';

function App() {
  const [period, setPeriod] = useState<'Day' | 'Week' | 'Month'>('Week');

  const totals = mockedLogs.map((u) =>
    u.logs.reduce((sum, log) => sum + log.duration, 0)
  );
  const maxTotal = Math.max(...totals);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        {(['Day', 'Week', 'Month'] as const).map((p) => (
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
        <button style={{
          marginLeft: 'auto',
          padding: '0.5rem 1rem',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>+ Add Log</button>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        {mockedLogs.map((user, i) => (
          <UserJar
            key={user.name}
            name={user.name}
            logs={user.logs}
            total={totals[i]}
            maxTotal={maxTotal}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
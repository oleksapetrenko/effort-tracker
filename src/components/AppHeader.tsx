import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Avatar } from './Avatar';

export const AppHeader = () => {
  const { name, logout } = useUser();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%'
      }}
    >
      <h1 style={{ margin: 0 }}>Effort Tracker</h1>
      {name ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Avatar name={name} />
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => navigate('/login')}>Login</button>
      )}
    </div>
  );
};

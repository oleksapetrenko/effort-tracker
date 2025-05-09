import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Avatar } from './Avatar';
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

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
      <h1 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>
        Effort Tracker
      </h1>
      {name ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Avatar name={name} />
          <button className="logout-button" onClick={logout} title="Logout">
            <FaSignOutAlt />
          </button>
        </div>
      ) : (
        <button className="logout-button" onClick={() => navigate('/login')} title="Login">
          <FaSignInAlt />
        </button>
      )}
    </div>
  );
};

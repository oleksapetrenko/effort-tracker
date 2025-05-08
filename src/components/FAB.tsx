import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FAB.css';

export const FAB: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button aria-label="Add Log" className="fab" onClick={() => navigate('/add')}>
      +
    </button>
  );
};

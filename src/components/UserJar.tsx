import { JarShape } from './JarShape';
import { CircleChart } from './CircleChart';
import './UserJar.css';
import { Avatar } from './Avatar';
import { Link } from 'react-router-dom';
import { FaTrophy } from 'react-icons/fa';
import { categoryColors } from '../data';

type Props = {
  name: string;
  total: number;
  maxTotal: number;
  logs: { category: string; duration: number }[];
  isLeader?: boolean;
};

export const UserJar = ({ name, total, maxTotal, logs, isLeader = false }: Props) => {
  const waterLevel = total / maxTotal;

  const slices = logs.map((log) => ({
    label: log.category,
    value: log.duration,
    color: categoryColors[log.category] || '#999'
  }));

  return (
    <div className="user-container" style={{ position: 'relative' }}>
      {isLeader && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            color: '#FFD700',
            fontSize: '1.5rem'
          }}
        >
          <FaTrophy />
        </div>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          justifyContent: 'center',
          marginBottom: '0.5rem'
        }}
      >
        <Avatar name={name} />
        <h3 style={{ margin: 0 }}>{name}</h3>
      </div>
      <Link to={`/calendar?user=${name}`}>
        <JarShape waterLevel={waterLevel} label={`${total} h`} />
      </Link>
      <div style={{ margin: '1rem auto' }}>
        <CircleChart slices={slices} />
      </div>
      <ul className="log-list">
        {logs.map((log, i) => (
          <li key={i}>
            • <strong>{log.category}</strong> – {log.duration} h
          </li>
        ))}
      </ul>
      <div className="total-label">Total: {total} h</div>
    </div>
  );
};

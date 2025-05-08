import { JarShape } from './JarShape';
import { CircleChart } from './CircleChart';
import './UserJar.css';
import { Avatar } from './Avatar';

type Props = {
  name: string;
  total: number;
  maxTotal: number;
  logs: { category: string; duration: number }[];
};

const categoryColors: Record<string, string> = {
  Development: '#4caf50',
  Testing: '#2196f3',
  Support: '#f44336',
  Research: '#9c27b0',
  Exercise: '#ff9800',
  Training: '#3f51b5'
};

export const UserJar = ({ name, total, maxTotal, logs }: Props) => {
  const waterLevel = total / maxTotal;

  const slices = logs.map((log) => ({
    label: log.category,
    value: log.duration,
    color: categoryColors[log.category] || '#999'
  }));

  return (
    <div className="user-container">
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
      <JarShape waterLevel={waterLevel} label={`${total} h`} />
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

import { JarShape } from './JarShape';
import './UserJar.css';

type Props = {
  name: string;
  total: number;
  maxTotal: number;
  logs: { category: string; duration: number }[];
};

export const UserJar = ({ name, total, maxTotal, logs }: Props) => {
  const waterLevel = total / maxTotal;

  return (
    <div className="user-container">
      <h3>{name}</h3>
      <JarShape waterLevel={waterLevel} label={`${total} h`} />
      <ul className="log-list">
        {logs.map((log, i) => (
          <li key={i}>
            • {log.category} – {log.duration} h
          </li>
        ))}
      </ul>
      <div className="total-label">Total: {total} h</div>
    </div>
  );
};
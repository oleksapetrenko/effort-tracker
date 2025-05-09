import { UserLogs } from '../data';

export interface UserSummary {
  name: string;
  total: number;
  logs: { category: string; duration: number }[];
}

export const isInRange = (date: string, start: Date, end: Date): boolean => {
  const d = new Date(date);
  return d >= start && d <= end;
};

export const calculateUserSummaries = (
  users: UserLogs[],
  start: Date,
  end: Date
): UserSummary[] => {
  return users.map((user) => {
    const logs = user.logs.filter((log) => isInRange(log.date, start, end));
    const total = logs.reduce((sum, log) => sum + log.duration, 0);
    const grouped = logs.reduce(
      (acc, log) => {
        const existing = acc.find((e) => e.category === log.category);
        if (existing) existing.duration += log.duration;
        else acc.push({ category: log.category, duration: log.duration });
        return acc;
      },
      [] as { category: string; duration: number }[]
    );

    return { name: user.name, total, logs: grouped };
  });
};

export const sortUsers = (summaries: UserSummary[], activeUser?: string): UserSummary[] => {
  return summaries.sort((a, b) => {
    if (a.name === activeUser) return -1;
    if (b.name === activeUser) return 1;
    return b.total - a.total;
  });
};

export const findLeaderName = (summaries: UserSummary[]): string | null => {
  const leader = summaries.reduce(
    (max, user) => (user.total > max.total ? user : max),
    summaries[0]
  );
  return leader?.name || null;
};

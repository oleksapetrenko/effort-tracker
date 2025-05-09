// src/data.ts

export type Log = {
  category: string;
  duration: number; // in hours
  date: string; // ISO format
  notes?: string;
};

export type UserLogs = {
  name: string;
  logs: Log[];
};

export const mockedLogs: UserLogs[] = [
  {
    name: 'Alice',
    logs: [
      { category: 'Development', duration: 2, date: '2025-05-08' },
      { category: 'Support', duration: 1, date: '2025-05-07' },
      { category: 'Testing', duration: 1.5, date: '2025-05-06' },
      { category: 'Development', duration: 2.5, date: '2025-05-05' },
      { category: 'Research', duration: 2, date: '2025-05-02' }
    ]
  },
  {
    name: 'Bob',
    logs: [
      { category: 'Development', duration: 3, date: '2025-05-08' },
      { category: 'Training', duration: 1, date: '2025-05-08' },
      { category: 'Support', duration: 1.5, date: '2025-05-07' },
      { category: 'Testing', duration: 2, date: '2025-05-04' },
      { category: 'Research', duration: 1, date: '2025-04-30' }
    ]
  },
  {
    name: 'Clara',
    logs: [
      { category: 'Exercise', duration: 1, date: '2025-05-08' },
      { category: 'Support', duration: 1, date: '2025-05-07' },
      { category: 'Development', duration: 3, date: '2025-05-06' },
      { category: 'Testing', duration: 2, date: '2025-05-01' },
      { category: 'Research', duration: 2.5, date: '2025-04-28' }
    ]
  },
  {
    name: 'Daniel',
    logs: [
      { category: 'Research', duration: 1.5, date: '2025-05-08' },
      { category: 'Development', duration: 2, date: '2025-05-07' },
      { category: 'Testing', duration: 2, date: '2025-05-05' },
      { category: 'Training', duration: 1.5, date: '2025-05-03' },
      { category: 'Support', duration: 1, date: '2025-04-29' }
    ]
  }
];

export const logsByUser = (name: string) => {
  return mockedLogs.find((u) => u.name === name)?.logs || [];
};

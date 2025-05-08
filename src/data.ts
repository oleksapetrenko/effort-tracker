
export type Log = {
  category: string;
  duration: number;
  date: string; // ISO 8601 format: YYYY-MM-DD
};

export type UserLog = {
  name: string;
  logs: Log[];
};

export const mockedLogs: UserLog[] = [
  {
    name: 'Alice',
    logs: [
      { category: 'Development', duration: 2, date: '2025-05-08' },
      { category: 'Testing', duration: 1, date: '2025-05-08' },
      { category: 'Support', duration: 2, date: '2025-05-07' },
      { category: 'Development', duration: 3, date: '2025-05-06' }
    ],
  },
  {
    name: 'Bob',
    logs: [
      { category: 'Development', duration: 2, date: '2025-05-07' },
      { category: 'Testing', duration: 3, date: '2025-05-06' },
      { category: 'Development', duration: 2, date: '2025-05-05' }
    ],
  },
  {
    name: 'Charlie',
    logs: [
      { category: 'Testing', duration: 3, date: '2025-05-08' },
      { category: 'Exercise', duration: 2, date: '2025-05-07' }
    ],
  }
];

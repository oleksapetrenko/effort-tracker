export type CategorySummary = {
  category: string;
  duration: number;
};

export type UserLog = {
  name: string;
  logs: CategorySummary[];
};

export const mockedLogs: UserLog[] = [
  {
    name: 'Alice',
    logs: [
      { category: 'Development', duration: 5 },
      { category: 'Testing', duration: 3 },
      { category: 'Support', duration: 1 },
    ],
  },
  {
    name: 'Bob',
    logs: [
      { category: 'Development', duration: 4 },
      { category: 'Testing', duration: 3 },
    ],
  },
  {
    name: 'Charlie',
    logs: [
      { category: 'Testing', duration: 3 },
      { category: 'Exercise', duration: 2 },
    ],
  },
];
export const DEPARTMENTS = ['Machining', 'Assembly', 'Packaging', 'Shipping'] as const;
export const STATUSES = ['Operational', 'Down', 'Maintenance', 'Retired'] as const;

export type Department = typeof DEPARTMENTS[number];
export type Status = typeof STATUSES[number]; 
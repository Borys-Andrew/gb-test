import { User } from "../types";

export const generateNextUserId = (users: User[]): number => {
  if (users.length === 0) return 1;

  const sorted = [...users].sort((a, b) => a.id - b.id);
  const maxId = sorted[sorted.length - 1].id;

  return maxId + 1;
};

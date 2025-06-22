import type { User } from './user';

export function isAdmin(user: User) {
  return user.admin;
}

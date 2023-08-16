import { User } from '../entities/user';

export function isAdmin(user: User) {
  return user.admin;
}

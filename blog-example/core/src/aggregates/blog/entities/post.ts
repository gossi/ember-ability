import type { User } from '../../user/entities/user';

export interface Post {
  id: string;
  author: User;
  title: string;
  content: string;
  link: string;
}

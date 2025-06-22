import type { User } from '../user';

export interface Post {
  id: string;
  author: User;
  title: string;
  content: string;
  link: string;
}

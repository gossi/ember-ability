import { isAdmin, type User } from '../user';

import type { Post } from './post';

export function canEdit(post: Post, user: User) {
  return post.author === user || isAdmin(user);
}

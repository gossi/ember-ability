import { isAdmin } from '../../user/abilities/user';

import type { User } from '../../user/entities/user';
import type { Post } from '../entities/post';

export function canEdit(post: Post, user: User) {
  return post.author === user || isAdmin(user);
}

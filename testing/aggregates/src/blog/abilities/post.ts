import { ability } from 'ember-ability';

import type { User } from '../../user/entities/user';
import type { Post } from '../entities/post';

export const canEdit = ability((post: Post, user: User) => {
  return post.author === user || user.admin;
});

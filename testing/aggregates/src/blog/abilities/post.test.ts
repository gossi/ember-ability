import { expect, test } from '@jest/globals';

// import { describe } from '@jest/globals';
import { canEdit } from './post';

import type { User } from '../../user/entities/user';
import type { Post } from '../entities/post';

test('canEdit', () => {
  const gossi: User = {
    givenName: 'Thomas',
    familyName: 'Gossmann',
    admin: false
  };
  const post: Post = {
    id: '1744',
    title: 'Frontend Component Architecture',
    content: '...',
    author: gossi
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(canEdit(post, gossi)).toBeTruthy();
});

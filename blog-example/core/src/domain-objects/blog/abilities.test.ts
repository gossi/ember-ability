import { describe, expect, test } from 'vitest';

import { ADMIN, GOSSI, ISAAC } from '../../fixtures';
import { canEdit } from './abilities';

import type { Post } from './post';

describe('canEdit', () => {
  test('can edit your own post', () => {
    const frontendComponentArchitecture: Post = {
      id: '1744',
      title: 'Frontend Component Architecture',
      content: '...',
      link: 'https://gos.si/blog/frontend-component-architecture',
      author: GOSSI
    };

    expect(canEdit(frontendComponentArchitecture, GOSSI)).toBeTruthy();
  });

  test('can edit as admin', () => {
    const emberAndStorybook: Post = {
      id: '4711',
      title: 'Ember with Storybook – Behind the Scenes',
      content: '...',
      link: 'https://gos.si/blog/ember-with-storybook-behind-the-scenes',
      author: GOSSI
    };

    expect(canEdit(emberAndStorybook, ADMIN)).toBeTruthy();
  });

  test('cannot edit foreign post', () => {
    const emberTimes206: Post = {
      id: '1744',
      title: 'The Ember Times - Issue No. 206',
      content: '...',
      link: 'https://blog.emberjs.com/the-ember-times-issue-206',
      author: ISAAC
    };

    expect(canEdit(emberTimes206, GOSSI)).toBeFalsy();
  });
});

import { GOSSI, ISAAC } from './users';

import type { Post } from '../../aggregates/blog/entities/post';

export const FRONTEND_COMPONENT_ARCHITECTURE: Post = Object.freeze({
  id: '1744',
  title: 'Frontend Component Architecture',
  content: '...',
  link: 'https://gos.si/blog/frontend-component-architecture',
  author: GOSSI
});

export const EMBER_AND_STORYBOOK: Post = Object.freeze({
  id: '4711',
  title: 'Ember with Storybook – Behind the Scenes',
  content: '...',
  link: 'https://gos.si/blog/ember-with-storybook-behind-the-scenes',
  author: GOSSI
});

export const EMBER_TIMES_206: Post = Object.freeze({
  id: '1744',
  title: 'The Ember Times - Issue No. 206',
  content: '...',
  link: 'https://blog.emberjs.com/the-ember-times-issue-206',
  author: ISAAC
});

import {
  EMBER_AND_STORYBOOK,
  EMBER_TIMES_206,
  FRONTEND_COMPONENT_ARCHITECTURE
} from '../aggregates/posts';

import type { Post } from '../../aggregates/blog';
import type { PollyServer } from '@pollyjs/core';

export function mockOverview(server: PollyServer, posts?: Post[]) {
  const data = posts ?? [FRONTEND_COMPONENT_ARCHITECTURE, EMBER_AND_STORYBOOK, EMBER_TIMES_206];

  server.get(`/posts`).intercept((_req, res) => {
    res.json(data);
  });
}

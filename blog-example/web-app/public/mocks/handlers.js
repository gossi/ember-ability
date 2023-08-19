import { rest } from 'msw';

import {
  EMBER_AND_STORYBOOK,
  EMBER_TIMES_206,
  FRONTEND_COMPONENT_ARCHITECTURE
} from '@my-blog/core/fixtures/aggregates/posts';

const data = [
  EMBER_AND_STORYBOOK,
  FRONTEND_COMPONENT_ARCHITECTURE,
  EMBER_TIMES_206
];

export const handlers = [
  rest.get('/api/posts', (_req, res, ctx) => {
    return res(ctx.json(data));
  }),

  rest.get('/api/posts/:id', (req, res, ctx) => {
    let { id } = req.params;

    let record = data.find((datum) => datum.id === id);

    if (record) {
      return res(ctx.json(record));
    }

    return res(
      ctx.status(404),
      ctx.json({ errors: [{ status: '404', detail: 'Blog not found' }] })
    );
  }),
];

import {
  EMBER_AND_STORYBOOK,
  EMBER_TIMES_206,
  FRONTEND_COMPONENT_ARCHITECTURE
} from '@my-blog/core/fixtures';
import { http, HttpResponse } from 'msw';

const data = [EMBER_AND_STORYBOOK, FRONTEND_COMPONENT_ARCHITECTURE, EMBER_TIMES_206];

export const handlers = [
  http.get('/api/posts', () => {
    return HttpResponse.json(data);
  }),

  http.get('/api/posts/:id', (req) => {
    const { id } = req.params;

    const record = data.find((datum) => datum.id === id);

    if (record) {
      return HttpResponse.json(record);
    }

    return HttpResponse.json(
      { errors: [{ status: '404', detail: 'Blog not found' }] },
      {
        status: 404
      }
    );
  })
];

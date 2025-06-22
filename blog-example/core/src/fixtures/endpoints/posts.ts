import { PollyServer } from '@pollyjs/core';

import { EMBER_AND_STORYBOOK, EMBER_TIMES_206, FRONTEND_COMPONENT_ARCHITECTURE } from '../posts';

import type { Post } from '../../domain-objects/blog';

type Server = PollyServer;

/**
 * Returns the data for the `GET /posts` endpoint
 *
 * @param posts preferred data, when omitted returns default
 * @returns Post[]
 */
export function dataForPosts(posts?: Post[]) {
  const data = posts ?? [FRONTEND_COMPONENT_ARCHITECTURE, EMBER_AND_STORYBOOK, EMBER_TIMES_206];

  // In this minimalistic example, the data structure equals the array of posts.
  return data;

  // If this would be JSON:API
  // return { data };
}

/**
 * Mocks the endpoint for polly
 *
 * @param server
 * @param posts preferred data
 */
function mockPolly(server: PollyServer, posts?: Post[]) {
  server.get(`/posts`).intercept((_req, res) => {
    res.json(dataForPosts(posts));
  });
}

/**
 * Mock `GET /posts` endpoint for the given server
 *
 * @param server
 * @param posts
 * @returns
 */
export function mockPosts(server: Server, posts?: Post[]) {
  if (server instanceof PollyServer) {
    mockPolly(server, posts);
  }

  // here could be mirage
}

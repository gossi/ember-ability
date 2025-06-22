import { PollyServer } from '@pollyjs/core';

import type { Post } from '../../domain-objects/blog';

type Server = PollyServer;

/**
 * Provides data structure for  `GET /post/:id` endpoint
 *
 * @param post
 * @returns
 */
export function dataForPost(post: Post) {
  const data = post;

  // In this minimalistic example, the data structure equals the post
  return data;

  // If this would be JSON:API
  // return { data: {
  //     type: 'post',
  //     id: data.id,
  //     attributes: data
  //   }
  // };
}

/**
 * Mock the `GET /post/:id` endpoint for polly
 *
 * @param server
 * @param post
 */
function mockPolly(server: PollyServer, post: Post) {
  server.get(`/post/${post.id}`).intercept((_req, res) => {
    res.json(dataForPost(post));
  });
}

/**
 * Mock `GET /post/:id` endpoint for the given server
 *
 * @param server
 * @param post
 * @returns
 */
export function mockPost(server: Server, post: Post) {
  if (server instanceof PollyServer) {
    mockPolly(server, post);
  }

  // here could be mirage
}

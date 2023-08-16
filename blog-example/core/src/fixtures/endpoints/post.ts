import type { Post } from '../../aggregates/blog';
import type { PollyServer } from '@pollyjs/core';

export function mockPost(server: PollyServer, post: Post) {
  server.get(`/post/${post.id}`).intercept((_req, res) => {
    res.json(post);
  });
}

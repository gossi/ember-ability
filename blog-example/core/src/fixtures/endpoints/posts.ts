import { EMBER_AND_STORYBOOK, EMBER_TIMES_206, FRONTEND_COMPONENT_ARCHITECTURE } from '../posts';

import type { Post } from '../../domain-objects/blog';

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

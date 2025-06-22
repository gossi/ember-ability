import type { Post } from '../../domain-objects/blog';

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

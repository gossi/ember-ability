import { canEdit as upstreamCanEdit, type Post } from '@my-blog/core/domain-objects/blog';
import { ability } from 'ember-ability';
import { RemoteData } from 'reactiveweb/remote-data';

import type { TOC } from '@ember/component/template-only';

const RemotePost = RemoteData<Post>;
const urlFor = (id: string) => `/api/posts/${id}`;

const canEdit = ability(({ services }) => (post: Post) => {
  return upstreamCanEdit(post, services.user.currentUser);
});

export const Loaded: TOC<{ Args: { post: Post } }> = <template>
  {{#if (canEdit @post)}}
    <aside>You can edit this post</aside>
  {{/if}}

  <article>
    <header>
      <h1>{{@post.title}}</h1>
    </header>

    Original Article:
    <a href="{{@post.link}}" target="_blank" rel="noopener noreferrer">{{@post.link}}</a>
  </article>
</template>;

interface PostSignature {
  Args: {
    model: string;
  };
}

const PostRoute: TOC<PostSignature> = <template>
  {{#let (RemotePost (urlFor @model)) as |request|}}
    {{#if request.value}}
      <Loaded @post={{request.value}} />
    {{/if}}
  {{/let}}
</template>;

export default PostRoute;

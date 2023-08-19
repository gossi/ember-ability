import { canEdit as upstreamCanEdit, type Post } from '@my-blog/core/aggregates/blog';
import { ability } from 'ember-ability';
import { RemoteData } from 'ember-resources/util/remote-data';

import type { TOC } from '@ember/component/template-only';

const RemotePost = RemoteData<Post>;
const urlFor = (id: string) => `/api/posts/${id}`;

const canEdit = ability(({ services }) => (post: Post) => {
  return upstreamCanEdit(post, services.user.currentUser);
});

interface PostSignature {
  Args: {
    id: string;
  };
}

const P: TOC<PostSignature> = <template>
  {{#let (RemotePost (urlFor @id)) as |request|}}
    {{#if request.value}}
      {{#if (canEdit request.value)}}
        <aside>You can edit this post</aside>
      {{/if}}

      <article>
        <header>
          <h1>{{request.value.title}}</h1>
        </header>

        Original Article: <a href="{{request.value.link}}" target="_blank">{{request.value.link}}</a>
      </article>
    {{/if}}
  {{/let}}
</template>

export default P;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Post: typeof P;
  }
}

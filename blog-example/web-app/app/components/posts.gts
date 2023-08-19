import { on } from '@ember/modifier';

import { RemoteData } from 'ember-resources/util/remote-data';

import type { TOC } from '@ember/component/template-only';
import type { Post } from '@my-blog/core/aggregates/blog';
import type { Link } from 'ember-link';

const RemotePosts = RemoteData<Post[]>;

interface PostsSignature {
  Args: {
    buildPostLink: (id: string) => Link;
  };
}

const Posts: TOC<PostsSignature> = <template>
  {{#let (RemotePosts "/api/posts") as |request|}}
    {{#if request.value}}
      {{#each request.value as |post|}}
        <article>
          {{#let (@buildPostLink post.id) as |link|}}
            <h1><a href={{link.url}} {{on "click" link.open}}>{{post.title}}</a></h1>
          {{/let}}
        </article>
      {{/each}}
    {{/if}}
  {{/let}}
</template>

export default Posts;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Posts: typeof Posts;
  }
}

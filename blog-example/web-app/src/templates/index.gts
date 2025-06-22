import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { service } from '@ember/service';

import { RemoteData } from 'reactiveweb/remote-data';

import type { Post } from '@my-blog/core/domain-objects/blog';
import type { Link, LinkManagerService } from 'ember-link';

const RemotePosts = RemoteData<Post[]>;

export default class PostRoute extends Component {
  @service declare linkManager: LinkManagerService;

  buildPostLink = (id: string): Link => {
    return this.linkManager.createLink({
      route: 'post',
      models: [id]
    });
  };

  <template>
    {{#let (RemotePosts "/api/posts") as |request|}}
      {{#if request.value}}
        {{#each request.value as |post|}}
          <article>
            {{#let (this.buildPostLink post.id) as |link|}}
              <h1><a href={{link.url}} {{on "click" link.open}}>{{post.title}}</a></h1>
            {{/let}}
          </article>
        {{/each}}
      {{/if}}
    {{/let}}
  </template>
}

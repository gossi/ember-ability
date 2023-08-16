import { canEdit as upstreamCanEdit, type Post } from '@my-blog/core/aggregates/blog';
import { ability } from 'ember-ability';
import { RemoteData } from 'ember-resources/util/remote-data';

const urlFor = (id: string) => `/api/posts/${id}`;

const canEdit = ability(({ services }) => (post: Post) => {
  console.log(post, services);

  return true;
  // upstreamCanEdit(post, services.user.currentUser)
});

<template>
  {{#let (RemoteData (urlFor @id)) as |request|}}
    {{#if request.value}}
      {{log request.value}}
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

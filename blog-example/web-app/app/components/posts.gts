import { on } from '@ember/modifier';

import { RemoteData } from 'ember-resources/util/remote-data';

<template>
  {{#let (RemoteData "/api/posts") as |request|}}
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

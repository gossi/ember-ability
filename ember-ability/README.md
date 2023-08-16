# ember-ability

Connect your plain guards, questions or abilities with Ember's DI system, the owner.

## Installation

```sh
ember install ember-ability
```

## Example

Let's say we want to put a link to registration, but only when the user is not
already logged in. We have an ability `canRegister`, which is based on the
`isAuthenticated` from `session` service from
[`ember-simple-auth`](https://github.com/simplabs/ember-simple-auth):

```ts
const canRegister = ability(({ services }) => () => {
  const { session } = services;

  return !session.isAuthenticated;
});

<template>
  {{#if (canRegister)}}
    <LinkTo @route="registration">Register</LinkTo>
  {{/if}}
</template>
```

Wait? The `Owner` does not provide destructuring by default, what is happening
here? Since in an ability we are interesting in reading information, we can
utilize a read API of the owner, with syntactical _sugar_ from
[`ember-sweet-owner`](https://github.com/gossi/ember-sweet-owner).

## Real World Usage

At best - and this is what `ember-ability` is created for - is to connect an
existing business logic available in plain js/ts with Ember's system. In a blog
engine, we want to control editing of a blog post. As business logic is
considered to be _pure_, here is the relevant snippet:

```ts
// @my-blog/core

export interface User {
  givenName: string;
  familyName: string;

  admin: boolean;
}

export interface Post {
  id: string;
  author: User;
  title: string;
  content: string;
}

export function canEdit(post: Post, user: User) => {
  return post.author === user || user.admin;
}
```

The `canEdit` function controls whether this functionality is available to a
given user. Since this is plain typescript, this can be properly unit tested to
ensure business logic works as expected.

In an Ember world, the `User` is available via service. Let's say as
`currentUser` of the `user` service. And we can use the above function like so:

```ts
import Component from '@glimmer/component';
import UserService from '@my-blog/ember-app/services/user';
import { canEdit } from '@my-blog/core';

export default class AppNavigation extends Component {
  @service declare user: UserService;
  
  <template>
    {{#if (canEdit @post this.user.currentUser)}}
      <LinkTo @route="post.edit" @model={{@post}}>Edit Post</LinkTo>
    {{/if}}
  </template>
}
```

But this is cumbersome, with the usage of `ember-ability`, the API can be
reduced to a minimum:

```ts
import { canEdit as upstreamCanEdit} from '@my-blog/core';
import { ability } from 'ember-ability';

const canEdit = ability(({ services }) => (post: Post) => upstreamCanEdit(post, services.user.currentUser));

<template>
  {{#if (canEdit @post)}}
    <LinkTo @route="post.edit" @model={{@post}}>Edit Post</LinkTo>
  {{/if}}
</template>
```

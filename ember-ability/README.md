# ember-ability

Connect your plain guards, questions or abilities with Ember's DI system, the
owner.

The successor to [`ember-can`](https://github.com/minutebase/ember-can).

## Compatibility

- Ember.js v3.28 or above
- Embroider or ember-auto-import v2

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
existing business logic available in plain js/ts with Ember. In a blog
engine, we want to control editing of a blog post. As business logic is
considered to be _pure_, here is the relevant snippet:

```ts
// @my-blog/core

export interface User {
  id: number;
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
  return post.author.id === user.id || user.admin;
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

const canEdit = ability(({ services }) => 
  (post: Post) => upstreamCanEdit(post, services.user.currentUser)
);

<template>
  {{#if (canEdit @post)}}
    <LinkTo @route="post.edit" @model={{@post}}>Edit Post</LinkTo>
  {{/if}}
</template>
```

Code for the example is available in two packages:

- [`@my-blog/core`](https://github.com/gossi/ember-ability/tree/main/blog-example/core) - Contains the entire business logic + fixtures
- [`@my-blog/web-app`](https://github.com/gossi/ember-ability/tree/main/blog-example/web-app) - The ember app with `ability()`

## Migration from `ember-can`

As `ember-ability` is the successor to `embe-can` here is a practical guide to
migrate over`. This is a two step process, to properly plan tech debt tickets.

The guide focuses on the `PostAbility`:

```ts
// app/abilities/post.ts

import { service } from '@ember/service';
import { Ability } from 'ember-can';
import UserService from '../services/user';

export default class PostAbility extends Ability {
  @service declare user: UserService;

  get canEdit() {
    return this.user.currentUser.admin || this.model.author.id === this.user.currentUser.id;
  }
}
```

### 1. Extract Pure Ability

As first step, extract the `canEdit` accessor into its own function. At this
point you _should_ consider creating a plain js/ts package, that holds your
business logic. A pure package has proven to be the best place. Type your `Post`
and `User` objects. Move focus to the signature of your pure ability functions.

```ts
// @blog/core/post/abilities.ts

import type { Post } from '../post';
import type { User } from '../../user';

export function canEdit(post: Post, user: User) {
  return user.admin || post.author.id === user.id;
}
```

Next step would be to create fixtures for `User` and `Post`. Don't use
fake-data. Record real traffic from your apps and store these payloads as
fixtures. With production-like fixtures, write unit tests for the function
above.

In a second effort use the unit-tested function in the `PostAbility`

```diff
// @blog/app/abilities/post.ts

import { service } from '@ember/service';
import { Ability } from 'ember-can';
import UserService from '../services/user';
+ import { canEdit } from '@blog/core/post/abilities';

export default class PostAbility extends Ability {
  @service declare user: UserService;

  get canEdit() {
-    return this.user.currentUser.admin || this.model.author.id === this.user.currentUser.id;
+    return canEdit(this.model, this.user.currentUser);
  }
}
```

### 2. Replace `ember-can` with `ember-ability`

When replacing an `ember-can` ability class with many functions, these newly
created abilities can either live organized together in one module or folder,
for re-use in many locations - or locally on the component/route. Both
approaches will be explained in the following, also with the two ways to connect
them to your components: co-located templates and single file components.

#### Using Co-located Templates

When using co-located templates, the backing class will pipe the ability into
the template. In this scenario, the ability is placed into its own module.

```ts
// app/abilities/post.ts

import { ability } from 'ember-ability';
import { canEdit as upstreamCanEdit } from '@blog/core/post/abilities';

export const canEdit = ability(({ services }) => 
  (post: Post) => upstreamCanEdit(post, services.user.currentUser)
);
```

... and use the backing class to pipe the ability into the template...

```ts
import { canEdit } from 'app/abilities/post';

export class Post extends Component {
  canEdit = canEdit;
}
```

... to use it in the template:

```hbs
{{#if (this.canEdit @post)}}
  <LinkTo @route="post.edit" @model={{@post}}>Edit Post</LinkTo>
{{/if}}
```

#### Using Single File Compponents (SFC)

SFCs allow to keep things local in one file, let's do so:

```ts
import { ability } from 'ember-ability';
import { canEdit as upstreamCanEdit } from '@blog/core/post/abilities';

export const canEdit = ability(({ services }) => 
  (post: Post) => upstreamCanEdit(post, services.user.currentUser)
);

<template>
  ...

  {{#if (canEdit @post)}}
    <LinkTo @route="post.edit" @model={{@post}}>Edit Post</LinkTo>
  {{/if}}
</template>
```

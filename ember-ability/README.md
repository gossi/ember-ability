# Containers for Ember

The dependency injection in ember works through the `Owner`.  An _object_ on
which objects can be registered and later on looked up. It doesn't have the most
convenient API when passing around the _owner_ as "container" for dependencies.
Here comes `ember-ability` into play. A wrapper around owner for a nicer API
to embers DI.

## Example

Let's say we want to access `isAuthenticated` from `session` service from
[`ember-simple-auth`](https://github.com/simplabs/ember-simple-auth) in a
function.

```ts
function canLogin({ services }) {
  const { session } = services;

  return session.isAuthenticated;
}
```

which we invoke from a component:

```ts
import { getOwner } from '@ember/application';
import Component from '@glimmer/component';
import makeContainer from 'ember-ability';

export default class MyComponent extends Component {

  get canLogin() {
    return canLogin(makeContainer(getOwner(this)));
  }
}
```

Whilst this is more of a showcase to demo its usage; at best, this is used as a
low-level API as part of your libraries that pipe through the `Owner` into
userland code.

## Installation

tbd.

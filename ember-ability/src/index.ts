import { makeContainer } from 'ember-container';
import { resource, resourceFactory } from 'ember-resources';

import type { Container } from 'ember-container';

type Ability<Params extends unknown[], Return = unknown> =
  | ((...args: Params) => Return)
  | ((...args: [...Params, Container]) => Return);

export function ability<Params extends unknown[], Return = unknown>(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  ability: Ability<Params, Return>
) {
  return resourceFactory<Return, Params>((...args) => {
    //

    return resource(({ owner }) => {
      // setup
      // on.cleanup(() => {});

      const container = makeContainer(owner); // or maybe container directly ?

      // "the getter" of the resource
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return ability(...args, container);
    });
  });
}

import { resource, resourceFactory } from 'ember-resources';
import { sweetenOwner } from 'ember-sweet-owner';

import type Owner from '@ember/owner';
import type { SweetOwner } from 'ember-sweet-owner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: never[]) => any;

export function ability<F extends AnyFunction>(setup: (owner: SweetOwner) => F) {
  return resourceFactory<ReturnType<F>, Parameters<F>>((...args) => {
    const CACHE = new WeakMap<Owner, F>();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return resource(({ owner }) => {
      if (!CACHE.has(owner)) {
        CACHE.set(owner, setup(sweetenOwner(owner)));
      }

      const runAbility = CACHE.get(owner) as F;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return runAbility(...args);
    });
  });
}

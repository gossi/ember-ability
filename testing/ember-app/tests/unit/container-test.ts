import Service from '@ember/service';
import { module, test } from 'qunit';

import { makeContainer } from 'ember-ability';

import { setupTest } from '../helpers';

import type { TestContext } from '@ember/test-helpers';

class FooService extends Service {
  prop = 'foo';
}

declare module '@ember/service' {
  interface Registry {
    foo: FooService;
  }
}

module('Unit | Container', function (hooks) {
  setupTest(hooks);

  test('can access service from container', async function (this: TestContext, assert) {
    this.owner.register('service:foo', FooService);

    const container = makeContainer(this.owner);

    assert.ok(container.services.foo);
    assert.strictEqual(container.services.foo.prop, 'foo');
  });

  test('destructuring', async function (this: TestContext, assert) {
    this.owner.register('service:foo', FooService);

    const { services } = makeContainer(this.owner);
    const { foo } = services;

    assert.ok(foo);
    assert.strictEqual(foo.prop, 'foo');
  });
});

import Service from '@ember/service';
import { module, test } from 'qunit';

import { ability } from 'ember-ability';

import { setupTest } from '../helpers';

import type { TestContext } from '@ember/test-helpers';

module('Unit | ability', function (hooks) {
  setupTest(hooks);

  test('can check something', function (this: TestContext, assert) {
    assert.ok(true);
  });
});

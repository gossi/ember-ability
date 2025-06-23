import { render, type TestContext } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { ADMIN, EMBER_AND_STORYBOOK, EMBER_TIMES_206, GOSSI } from '@my-blog/core/fixtures';

import PostRoute from '#/templates/post.gts';
import { setupMSW, setupRenderingTest, setupUser } from '#tests/helpers.ts';

module('Route | Post', function (hooks) {
  setupRenderingTest(hooks);
  setupMSW(hooks);

  module('For User', function (userHooks) {
    setupUser(userHooks, GOSSI);

    test('Edit is visible for your own post', async function (this: TestContext, assert) {
      await render(<template><PostRoute @model={{EMBER_AND_STORYBOOK.id}} /></template>);

      assert.dom('aside').exists();
    });

    test('Edit is visible for a foreign post', async function (this: TestContext, assert) {
      await render(<template><PostRoute @model={{EMBER_TIMES_206.id}} /></template>);

      assert.dom('aside').doesNotExist();
    });
  });

  module('For Admin', function (adminHooks) {
    setupUser(adminHooks, ADMIN);

    test('Edit is visible for gossi', async function (this: TestContext, assert) {
      await render(<template><PostRoute @model={{EMBER_AND_STORYBOOK.id}} /></template>);

      assert.dom('aside').exists();
    });

    test('Edit is visible for Isaac', async function (this: TestContext, assert) {
      await render(<template><PostRoute @model={{EMBER_TIMES_206.id}} /></template>);

      assert.dom('aside').exists();
    });
  });
});

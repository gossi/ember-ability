import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
  type SetupTestOptions
} from 'ember-qunit';

import { worker } from '#/mocks/browser.ts';

import type UserService from '../src/services/user';
import type { TestContext } from '@ember/test-helpers';
import type { User } from '@my-blog/core/domain-objects/user';

// This file exists to provide wrappers around ember-qunit's
// test setup functions. This way, you can easily extend the setup that is
// needed per test type.

function setupApplicationTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupApplicationTest(hooks, options);

  // Additional setup for application tests can be done here.
  //
  // For example, if you need an authenticated session for each
  // application test, you could do:
  //
  // hooks.beforeEach(async function () {
  //   await authenticateSession(); // ember-simple-auth
  // });
  //
  // This is also a good place to call test setup functions coming
  // from other addons:
  //
  // setupIntl(hooks, 'en-us'); // ember-intl
  // setupMirage(hooks); // ember-cli-mirage
}

function setupRenderingTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupRenderingTest(hooks, options);

  // Additional setup for rendering tests can be done here.
}

function setupTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupTest(hooks, options);

  // Additional setup for unit tests can be done here.
}

function setupMSW(hooks: NestedHooks) {
  hooks.before(async () => void (await worker.start()));
  hooks.afterEach(() => worker.resetHandlers());
  hooks.after(() => worker.stop());
}

function setupUser(hooks: NestedHooks, user: User) {
  hooks.beforeEach(function (this: TestContext) {
    const userService: UserService = this.owner.lookup('service:user');

    userService.currentUser = user;
  });
}

export { setupApplicationTest, setupMSW, setupRenderingTest, setupTest, setupUser };

import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import { render, rerender } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { ability } from '../../src';
import { setupRenderingTest } from '../helpers';

import type { TestContext } from '@ember/test-helpers';

class SessionService extends Service {
  user = 'Tomster';
  @tracked authenticated = true;
}

declare module '@ember/service' {
  interface Registry {
    session: SessionService;
  }
}

module('Unit | ability', function (hooks) {
  setupRenderingTest(hooks);

  module('setup', function () {
    test('setup function is invoked', async function (this: TestContext, assert) {
      const canDo = ability((_owner) => {
        assert.step('setup');

        return () => {
          /* void */
        };
      });

      await render(<template>{{(canDo)}}</template>);

      assert.verifySteps(['setup']);
    });

    test('can access service in setup', async function (this: TestContext, assert) {
      this.owner.register('service:session', SessionService);

      const canDo = ability(({ services }) => {
        assert.step(services.session.user);

        return () => {
          /* void */
        };
      });

      await render(<template>{{(canDo)}}</template>);

      assert.verifySteps(['Tomster']);
    });
  });

  module('ability', function () {
    test('ability is non-reactive', async function (this: TestContext, assert) {
      this.owner.register('service:session', SessionService);

      const isTomster = ability(({ services }) => {
        return () => services.session.user === 'Tomster';
      });

      await render(
        <template>
          {{#if (isTomster)}}
            yes
          {{else}}
            no
          {{/if}}
        </template>
      );

      assert.dom().hasText('yes');

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const session = this.owner.lookup('service:session') as SessionService;

      session.user = 'Zoey';

      await rerender();

      assert.dom().hasText('yes'); // as user is not tracked, it still renders yes for Tomster
    });

    test('ability is reactive', async function (this: TestContext, assert) {
      this.owner.register('service:session', SessionService);

      const isAuthenticated = ability(({ services }) => {
        return () => services.session.authenticated;
      });

      await render(
        <template>
          {{#if (isAuthenticated)}}
            yes
          {{else}}
            no
          {{/if}}
        </template>
      );

      assert.dom().hasText('yes');

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const session = this.owner.lookup('service:session') as SessionService;

      session.authenticated = false;

      await rerender();

      assert.dom().hasText('no');
    });
  });
});

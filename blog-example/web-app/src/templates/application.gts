import Component from '@glimmer/component';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import { service } from '@ember/service';

import { ADMIN, GOSSI, ISAAC } from '@my-blog/core/fixtures';
import { pageTitle } from 'ember-page-title';

import type { User } from '@my-blog/core/domain-objects/user';
import type UserService from '#/services/user';

export default class ApplicationRoute extends Component {
  @service declare user: UserService;

  users = [GOSSI, ISAAC, ADMIN];

  switchUser = (user: User) => {
    this.user.currentUser = user;
  };

  <template>
    {{pageTitle "Blog"}}
    <header>
      <h1><LinkTo @route="application">Blog</LinkTo></h1>

      <div>
        <div class="switch-users">
          {{#each this.users as |user|}}
            <button
              type="button"
              {{on "click" (fn this.switchUser user)}}
            >{{user.givenName}}</button>
          {{/each}}
        </div>

        <span>
          User:
          {{this.user.currentUser.givenName}}
        </span>
      </div>
    </header>

    {{outlet}}
  </template>
}

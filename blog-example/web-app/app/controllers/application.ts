import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

import { ADMIN, GOSSI, ISAAC } from '@my-blog/core/fixtures/aggregates/users';

import type UserService from '../services/user';
import type { User } from '@my-blog/core/aggregates/user';

export default class ApplicationController extends Controller {
  @service declare user: UserService;

  @action
  switchUser(user: User) {
    this.user.currentUser = user;
  }

  users = [GOSSI, ISAAC, ADMIN];
}

import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

import { GOSSI } from '@my-blog/core/fixtures/aggregates/users';

import type { User } from '@my-blog/core/aggregates/user';

export default class UserService extends Service {
  @tracked currentUser: User = GOSSI;
}

declare module '@ember/service' {
  interface Registry {
    user: UserService;
  }
}

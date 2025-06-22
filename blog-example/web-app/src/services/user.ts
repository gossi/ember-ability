import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

import { GOSSI } from '@my-blog/core/fixtures';

import type { User } from '@my-blog/core/domain-objects/user';

export default class UserService extends Service {
  @tracked currentUser: User = GOSSI;
}

declare module '@ember/service' {
  interface Registry {
    user: UserService;
  }
}

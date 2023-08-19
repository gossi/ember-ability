import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type { Link, LinkManagerService } from 'ember-link';

export default class PostRoute extends Route {
  @service declare linkManager: LinkManagerService;

  buildPostLink = (id: string): Link => {
    return this.linkManager.createLink({
      route: 'post',
      models: [id]
    });
  };

  model() {
    return {
      buildPostLink: this.buildPostLink
    };
  }
}

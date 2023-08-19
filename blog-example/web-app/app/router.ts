import EmberRouter from '@ember/routing/router';

import config from '@my-blog/web-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // eslint-disable-next-line @typescript-eslint/no-invalid-this
  this.route('post', { path: '/posts/:id' });
});

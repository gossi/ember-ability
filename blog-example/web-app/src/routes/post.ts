import Route from '@ember/routing/route';

export default class PostRoute extends Route {
  model({ id }: { id: string }) {
    return id;
  }
}

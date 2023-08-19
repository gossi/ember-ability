import { registerDestructor } from '@ember/destroyable';
import Route from '@ember/routing/route';

async function setupMSW(context: ApplicationRoute) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let { worker } = await import('/mocks/browser.js');

  await worker.start();

  worker.printHandlers();

  // Prevent duplication in tests,
  // where the app is setup and torn down a lot
  registerDestructor(context, () => worker.stop());
}

export default class ApplicationRoute extends Route {
  async beforeModel() {
    await setupMSW(this);
  }
}

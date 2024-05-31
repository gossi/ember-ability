import { registerDestructor } from '@ember/destroyable';
import Route from '@ember/routing/route';

async function setupMSW(context: ApplicationRoute) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { worker } = await import('/mocks/browser.js');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await worker.start();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  worker.printHandlers();

  // Prevent duplication in tests,
  // where the app is setup and torn down a lot
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  registerDestructor(context, () => worker.stop());
}

export default class ApplicationRoute extends Route {
  async beforeModel() {
    await setupMSW(this);
  }
}

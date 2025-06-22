import { registerDestructor } from '@ember/destroyable';
import Route from '@ember/routing/route';

async function setupMSW(context: ApplicationRoute) {
  const { worker } = await import('../mocks/browser.ts');

  await worker.start();

  for (const handler of worker.listHandlers()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(handler.info.header);
  }

  // Prevent duplication in tests,
  // where the app is setup and torn down a lot

  registerDestructor(context, () => worker.stop());
}

export default class ApplicationRoute extends Route {
  async beforeModel() {
    await setupMSW(this);
  }
}

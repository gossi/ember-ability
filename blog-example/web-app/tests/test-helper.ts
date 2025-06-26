import { setApplication } from '@ember/test-helpers';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';

import Application from '#/app.ts';
import { handlers } from '#/mocks/handlers';
import config, { enterTestMode } from '#config';

import { initMSW } from './helpers';

export function start() {
  enterTestMode();
  setApplication(Application.create(config.APP));

  // eslint-disable-next-line import-x/namespace
  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  initMSW(QUnit, handlers);

  qunitStart();
}

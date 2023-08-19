import { describe, expect, test } from '@jest/globals';

import {
  EMBER_AND_STORYBOOK,
  EMBER_TIMES_206,
  FRONTEND_COMPONENT_ARCHITECTURE
} from '../../../fixtures/aggregates/posts';
import { ADMIN, GOSSI } from '../../../fixtures/aggregates/users';
import { canEdit } from './post';

describe('canEdit', () => {
  test('can edit your own post', () => {
    expect(canEdit(FRONTEND_COMPONENT_ARCHITECTURE, GOSSI)).toBeTruthy();
  });

  test('can edit as admin', () => {
    expect(canEdit(EMBER_AND_STORYBOOK, ADMIN)).toBeTruthy();
  });

  test('cannot edit foreign post', () => {
    expect(canEdit(EMBER_TIMES_206, GOSSI)).toBeFalsy();
  });
});

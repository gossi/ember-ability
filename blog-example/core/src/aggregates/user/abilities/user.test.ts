import { describe, expect, test } from '@jest/globals';

import { ADMIN, GOSSI } from '../../../fixtures/aggregates/users';
import { isAdmin } from './user';

describe('isAdmin', () => {
  test('gossi is no admin', () => {
    expect(isAdmin(GOSSI)).toBeFalsy();
  });

  test('armin is an admin', () => {
    expect(isAdmin(ADMIN)).toBeTruthy();
  });
});

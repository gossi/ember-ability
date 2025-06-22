import { describe, expect, test } from 'vitest';

import { ADMIN, GOSSI } from '../../fixtures';
import { isAdmin } from './abilities';

describe('isAdmin', () => {
  test('gossi is no admin', () => {
    expect(isAdmin(GOSSI)).toBeFalsy();
  });

  test('armin is an admin', () => {
    expect(isAdmin(ADMIN)).toBeTruthy();
  });
});

import type { User } from '../../aggregates/user/entities/user';

export const GOSSI: User = Object.freeze({
  id: 1,
  givenName: 'Thomas',
  familyName: 'Gossmann',
  admin: false
});

export const ISAAC: User = Object.freeze({
  id: 2,
  givenName: 'Isaac',
  familyName: 'Lee',
  admin: false
});

export const ADMIN: User = Object.freeze({
  id: 3,
  givenName: 'Armin',
  familyName: 'Administrator',
  admin: true
});

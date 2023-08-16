import type { User } from '../../aggregates/user/entities/user';

export const GOSSI: User = Object.freeze({
  givenName: 'Thomas',
  familyName: 'Gossmann',
  admin: false
});

export const ISAAC: User = Object.freeze({
  givenName: 'Isaac',
  familyName: 'Lee',
  admin: false
});

export const ADMIN: User = Object.freeze({
  givenName: 'Armin',
  familyName: 'Administrator',
  admin: true
});

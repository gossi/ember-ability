import type { User } from '../domain-objects/user';

export const GOSSI: User = Object.freeze({
  id: 'gossi',
  givenName: 'Thomas',
  familyName: 'Gossmann',
  admin: false
});

export const ISAAC: User = Object.freeze({
  id: 'isaac',
  givenName: 'Isaac',
  familyName: 'Lee',
  admin: false
});

export const ADMIN: User = Object.freeze({
  id: 'admin',
  givenName: 'Armin',
  familyName: 'Administrator',
  admin: true
});

import fetch from 'cross-fetch';

window.fetch = fetch;

import { userService, Credentials } from '../../src/services/UserService';

test('test create user - success', () => {
  const cred = new Credentials();
  cred.email = 'td@x.com';
  cred.password = 'secret';
  return expect(userService.createUser(cred)).resolves.toBeDefined();
});

test('test create user - error', () => {
  const cred = new Credentials();
  cred.email = 'err@x.com';
  cred.password = 'secret';
  return userService
    .createUser(cred)
    .then(() => {
      fail('Test fails because promise resolves!');
    })
    .catch((err) => {});
});

test('test login - success', () => {
  const cred = new Credentials();
  cred.email = 'td@x.com';
  cred.password = 'secret';
  return expect(userService.login(cred)).resolves.toEqual({ accessToken: 'tesToken' });
});

test('test login - error', () => {
  const cred = new Credentials();
  cred.email = 'err@x.com';
  cred.password = 'secret';
  return userService
    .login(cred)
    .then(() => {
      fail('Test fails because promise resolves!');
    })
    .catch((err) => {});
});

test('test reset password - success', () => {
  const cred = new Credentials();
  cred.email = 'td@x.com';
  return expect(userService.resetPassword(cred)).resolves.toBeDefined();
});

test('test reset password - error', () => {
  const cred = new Credentials();
  cred.email = 'err@x.com';
  return userService
    .resetPassword(cred)
    .then(() => {
      fail('Test fails because promise resolves!');
    })
    .catch((err) => {});
});

test('test login facebook - success', () => {
  return expect(userService.loginFacebook('token')).resolves.toEqual({ accessToken: 'tesToken' });
});

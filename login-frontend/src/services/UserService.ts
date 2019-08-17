import { USER_ENDPOINT } from './ConfigService';

class Credentials {
  email: string = '';
  password: string = '';
}

interface FetchResponse {
  status: number;
  statusText: string;
  ok: boolean;
  url: string;
}

function status(response: FetchResponse) {
  console.log('status: ', response.status);
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function json(response: any) {
  console.log('inside json');
  return response.json();
}

class UserService {
  constructor() {}

  createUser(cred: Credentials) {
    console.log('In createUser()');
    return new Promise((resolve, reject) => {
      fetch(`${USER_ENDPOINT}/user/users`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        referrer: 'no-referrer',
        body: `{ "email": "${cred.email}", "password": "${cred.password}" }`
      })
        .then(status)
        .then(json)
        .then(data => {
          console.log('User registration succeeded', JSON.stringify(data));
          resolve(data);
        })
        .catch(function(error) {
          console.error('[UserService]: User registration failed', error);
          reject(error);
        });
    });
  }

  login(cred: Credentials) {
    console.log('Loggin in ', cred);
    return new Promise((resolve, reject) => {
      fetch(`${USER_ENDPOINT}/user/authentication`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        referrer: 'no-referrer',
        body: `{ "strategy": "local", "email": "${cred.email}", "password": "${cred.password}" }`
      })
        .then(status)
        .then(json)
        .then(data => {
          console.log('Request succeeded with JSON response', JSON.stringify(data));
          this.saveToken(data.accessToken);
          resolve(data);
        })
        .catch(function(error) {
          console.error('Request failed', error);
          reject(error);
        });
    });
  }

  resetPassword(cred: Credentials) {
    console.log('In reset password');
    return new Promise((resolve, reject) => {
      fetch(`${USER_ENDPOINT}/user/passwordreset`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        referrer: 'no-referrer',
        body: `{ "email": "${cred.email}" }`
      })
        .then(status)
        .then(json)
        .then(data => {
          console.log('Password reset succeeded', JSON.stringify(data));
          resolve(data);
        })
        .catch(error => {
          console.error('[UserService]: Password reset failed', error);
          reject(error);
        });
    });
  }

  loginFacebook(facebookToken: string) {
    console.log('Loggin Facebook in ', facebookToken);
    return new Promise((resolve, reject) => {
      fetch(`${USER_ENDPOINT}/user/authfacebook/xx`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Authorization: facebookToken
        },
        referrer: 'no-referrer'
      })
        .then(status)
        .then(json)
        .then(data => {
          console.log('Request succeeded with JSON response', data);
          this.saveToken(data.accessToken);
          resolve(data);
        })
        .catch(function(error) {
          console.error('[loginFacebook] Request failed', error);
          reject(error);
        });
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

const userService = new UserService();
export { userService, Credentials };

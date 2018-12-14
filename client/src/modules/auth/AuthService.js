// src/Auth/AuthService.js from https://auth0.com/docs/quickstart/spa/vuejs

import auth0 from 'auth0-js';
import EventEmitter from 'eventemitter3';
import router from '../../router';

class AuthService {
  auth0 = new auth0.WebAuth({
    domain: 'm4opsdev.eu.auth0.com',
    audience: 'https://m4opsdev.eu.auth0.com/userinfo',
    clientID: 'I740Fc9wEoQ1cBWhREZdhf10jqbqU2iJ',
    redirectUri: 'http://localhost:8080/callback',
    responseType: 'token id_token',
    scope: 'openid profile',
  })

  login() {
    this.auth0.authorize();
  }

  accessToken

  idToken

  expiresAt

  authenticated = this.isAuthenticated()

  authNotifier = new EventEmitter()

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        router.replace('maps');
      } else if (err) {
        router.replace('maps');
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line no-alert
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    this.authNotifier.emit('authChange', { authenticated: true });

    localStorage.setItem('loggedIn', 'true'); // was true (Boolean)
    // eslint-disable-next-line no-console, max-len
    console.log(localStorage.getItem('loggedIn'), localStorage.getItem('loggedIn') === 'true');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line no-alert, max-len
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });
  }

  logout() {
    // Clear access token and ID token from local storage
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = null;

    this.userProfile = null;
    this.authNotifier.emit('authChange', false);

    localStorage.removeItem('loggedIn');

    // navigate to the maps route
    router.replace('home');
    // router.replace('maps');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this.expiresAt
      && localStorage.getItem('loggedIn') === 'true';
  }
}

export default new AuthService();

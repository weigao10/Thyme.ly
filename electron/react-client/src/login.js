import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { parse } from 'url';
import { remote, ipcRenderer } from 'electron';
import axios from 'axios';
import qs from 'qs';

import App from './App.jsx';
import config from '../reactConfig.js';
const { bundleId, clientId, redirectURI } = config;
const serverURL = process.env.NODE_ENV === 'localhost' ? config.localhost : config.server;

//bypass login page if a user is logged in already via cookie
ipcRenderer.send('cookies', 'check');
ipcRenderer.on('cookies', (event, message) => {
  ReactDOM.render((<App/>), document.getElementById('app'));
  document.getElementById('login-page').innerHTML = '';
});

$('.message a').click(function(){
  $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

//login needs to pass firebase info to main session too
const auth = firebase.auth();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
const provider = new firebase.auth.GoogleAuthProvider();
const registerButton = document.getElementById('register');
const loginButton = document.getElementById('login');
const googleButton = document.getElementById('google');

const renderApp = (uId, jwtToken) => {
  ipcRenderer.send('cookies', 'logged in', uId)
  //set JWT token too
  ReactDOM.render((<App/>), document.getElementById('app'));
  document.getElementById('login-page').innerHTML = '';
};

//add event listeners for the three login methods
loginButton.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then((data) => {
      console.log('user data is', data);
      // renderApp(data.user.uid);
      return data.user.getIdToken();
    })
    .then((idToken) => {
      return axios.post(serverURL + '/session', {idToken});
    })
    .then((data) => {
      console.log('response from server after posting idtoken is', data)
      //render app with uid and jwt (maybe just need jwt)
    })
    .catch((err) => {
      console.log('err trying to get id token', err);
      // alert('Error logging in - are you sure you have the right email and password?');
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    });
});

registerButton.addEventListener('click', () => {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((data) => {
      renderApp(data.user.uid);
    })
    .catch((err) => {
      alert(err.message);
    });
});

googleButton.addEventListener('click', () => {
  signInWithPopup()
    .then((code) => {
      return fetchAccessTokens(code);
    })
    .then((token) => {
      return fetchGoogleProfile(token);
    })
    .then(({id}) => {
      renderApp(id);
    })
});

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me';

const signInWithPopup = (provider) => {
  return new Promise((resolve, reject) => {
    const authWindow = new remote.BrowserWindow({
      width: 500,
      height: 600,
      show: true,
    });

    const urlParams = {
      response_type: 'code',
      redirect_uri: bundleId + ':' +redirectURI,
      client_id: clientId,
      scope: 'profile email https://www.googleapis.com/auth/calendar',
    };
    const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`;

    function handleNavigation (url) {
      const query = parse(url, true).query;
      if (query) {
        if (query.error) {
          reject(new Error(`There was an error: ${query.error}`));
        } else if (query.code) {
          authWindow.removeAllListeners('closed');
          setImmediate(() => authWindow.close());
          resolve(query.code);
        }
      }
    }

    authWindow.webContents.on('will-navigate', (event, url) => {
      handleNavigation(url);
    });

    authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      handleNavigation(newUrl);
    });

    authWindow.loadURL(authUrl);
  })
}

const fetchAccessTokens = (code) => {
  return axios.post(GOOGLE_TOKEN_URL, qs.stringify({
    code,
    client_id: clientId,
    redirect_uri: bundleId + ':' +redirectURI,
    grant_type: 'authorization_code',
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  .then((data) => data.data.access_token)
};

const fetchGoogleProfile = (accessToken) => {
  return axios.get(GOOGLE_PROFILE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  .then((data) => {
    ipcRenderer.send('token', 'logged in', accessToken);
    return data.data;
  })
};

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import $ from 'jquery';
import config from '../../config.js'
import {bundleId, clientId, redirectURI} from '../../config.js'
import {parse} from 'url'
import {remote} from 'electron'
import axios from 'axios'
import qs from 'qs'

const SERVER_URL = 'http://127.0.0.1:3000';

$('.message a').click(function(){
  $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const auth = firebase.auth();

var registerButton = document.getElementById('register')
var loginButton = document.getElementById('login')
var googleButton = document.getElementById('google')

googleButton.addEventListener('click', () => {
  googleSignIn()
})

registerButton.addEventListener('click', () => {
  let name = document.getElementById('reg-name').value
  let email = document.getElementById('reg-email').value
  let password = document.getElementById('reg-password').value

  auth.createUserWithEmailAndPassword(email, password)
  .then((data) => {
    ReactDOM.render((<App />), document.getElementById('app'))
    document.getElementById('login-page').innerHTML = ''
  })
  .catch((err) => alert(JSON.stringify(err)));
})


loginButton.addEventListener('click', () => {
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  auth.signInWithEmailAndPassword(email, password)
  .then((data) => {
    console.log('entire data obj is', data)
    console.log('user id from regular login is', data.user.uid)
    ReactDOM.render((<App />), document.getElementById('app'))
    document.getElementById('login-page').innerHTML = ''
    return data;
  })
  .then((user) => {
    return user.user.getIdToken().then(idToken => {
      // console.log('id token is', idToken)
      // const csrfToken = document.getCookie('csrfToken');
      // console.log('csrf token is', csrfToken)
      return axios.post(SERVER_URL + '/login', idToken)
        .then(resp => console.log('resp from login attempt is', resp))
        .catch(err => console.error('error in trying to post login is', err))
    })
  })
  .catch((err) => {
    console.error(err);
    // alert('Username/password combination do not match.')
    //clear form
  })
})

function googleSignIn () {
  signInWithPopup()
  .then((code) => {
    return fetchAccessTokens(code)
  })
  .then((tokens) => {
    return fetchGoogleProfile(tokens.access_token)
  })
  .then(({id, email, name}) => {
    console.log('google oauth id', id)
    return {
      //use to identify google oauth log ins?
      id: id,
      email: email,
      name: name
    }
  })
}

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'
const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me'

function signInWithPopup () {
  return new Promise((resolve, reject) => {
    const authWindow = new remote.BrowserWindow({
      width: 500,
      height: 600,
      show: true,
    })

    const urlParams = {
      response_type: 'code',
      redirect_uri: bundleId + ':' +redirectURI,
      client_id: clientId,
      scope: 'profile email',
    }
    const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`

    function handleNavigation (url) {
      const query = parse(url, true).query
      if (query) {
        if (query.error) {
          reject(new Error(`There was an error: ${query.error}`))
        } else if (query.code) {
          // Login is complete
          authWindow.removeAllListeners('closed')
          setImmediate(() => authWindow.close())
          resolve(query.code)
          //move this to google event listener
          ReactDOM.render((<App />), document.getElementById('app'))
          document.getElementById('login-page').innerHTML = ''
        }
      }
    }

    authWindow.webContents.on('will-navigate', (event, url) => {
      handleNavigation(url)
    })

    authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      handleNavigation(newUrl)
    })

    authWindow.loadURL(authUrl)
  })
}

function fetchAccessTokens (code) {
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
  .then((data) => data.data)
}

function fetchGoogleProfile (accessToken) {
  return axios.get(GOOGLE_PROFILE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  .then((data) => {
    console.log('data from google profile is', data);
    const csrfToken = getCookie('csrfToken')
    console.log('csrfTokane is', csrfToken)
    return data.data
  })
}

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { parse } from 'url'
import { remote, ipcRenderer } from 'electron'
import axios from 'axios'
import qs from 'qs'
import readline from 'readline';
import { google } from 'googleapis'
import cron from 'cron';
import moment from 'moment';

import App from './App.jsx';
import config from '../config.js';
const { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } = config;

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me';

//bypass login page if a user is logged in already via cookie
ipcRenderer.send('cookies', 'check');
ipcRenderer.on('cookies', (event, message) => {
  ReactDOM.render((<App user={message.value}/>), document.getElementById('app'));
  document.getElementById('login-page').innerHTML = '';
});

// $('.message a').click(function(){
//   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
// });

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const registerButton = document.getElementById('register');
const loginButton = document.getElementById('login');
const googleButton = document.getElementById('google');

loginButton.addEventListener('click', () => {
  const emailField = document.getElementById('email').value;
  const passwordField = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(emailField, passwordField)
    .then((data) => {
      const uId = data.user.uid;
      ipcRenderer.send('cookies', 'logged in', uId)
      ReactDOM.render((<App user={uId}/>), document.getElementById('app'));
      document.getElementById('login-page').innerHTML = '';
    })
    .catch((err) => {
      alert('Error logging in - are you sure you have the right email and password?');
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    })
});

registerButton.addEventListener('click', () => {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((data) => {
      ipcRenderer.send('cookies', 'logged in', data.user.uid);
      ReactDOM.render((<App user={uId}/>), document.getElementById('app'));
      document.getElementById('login-page').innerHTML = '';
    })
    .catch((err) => {
      alert(err.message);
    });
});


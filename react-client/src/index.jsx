import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import config from '../../config.js'
import $ from 'jquery';

$('.message a').click(function(){
  $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
var provider = new firebase.auth.GoogleAuthProvider();
var auth = firebase.auth();
auth.signInWithPopup(provider); 

var registerButton = document.getElementById('register')
var loginButton = document.getElementById('login')

registerButton.addEventListener('click', () => {
  let name = document.getElementById('reg-name').value
  let email = document.getElementById('reg-email').value
  let password = document.getElementById('reg-password').value

  auth.createUserWithEmailAndPassword(email, password)
  .then((data) => ReactDOM.render((<App />), document.getElementById('app')))
  .catch((err) => console.log('err in register: ', err))
})


loginButton.addEventListener('click', () => {
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  auth.signInWithEmailAndPassword(email, password)
  .then((data) => {
    //make home log in html page go away
    
    ReactDOM.render((<App />), document.getElementById('app'))
    document.getElementById('login-page').innerHTML = ''
  })
  .catch((err) => alert('Username/password combination do not match.'))
})


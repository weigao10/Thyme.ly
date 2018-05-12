import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import config from '../../config.js'
import $ from 'jquery';

$('.message a').click(function(){
  $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();

var googleSignIn = () => {
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });
}

var registerButton = document.getElementById('register')
var loginButton = document.getElementById('login')

registerButton.addEventListener('click', () => {
  let name = document.getElementById('reg-name').value
  let email = document.getElementById('reg-email').value
  let password = document.getElementById('reg-password').value

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((data) => ReactDOM.render((<App />), document.getElementById('app')))
  .catch((err) => console.log('err in register: ', err))
})


loginButton.addEventListener('click', () => {
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((data) => ReactDOM.render((<App />), document.getElementById('app')))
  .catch((err) => alert('Username/password combination do not match.'))
})


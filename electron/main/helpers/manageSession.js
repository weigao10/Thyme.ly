const electron = require('electron')
const { app, BrowserWindow, ipcMain, session } = electron;
const moment = require('moment')
const { serverURL } = require('../config.js');
const index = require('../index.js')

//handle whether user can skip login, needs to login, or handle user logout
const manageCookies = (mainSession, mainWindow) => {
  ipcMain.on('cookies', (mainWindow, event, message) => {
    console.log('event is', event);
    console.log('message is', message);

    if (event === 'check') {
      mainSession.cookies.get({name: 'userId', serverURL}, (err, cookies) => {
        if (cookies.length) mainWindow.sender.webContents.send('cookies', cookies[0]);
        //if cookie does not exist, don't send it back
      });
    } else if (event === 'logged in') {
      console.log('user logged in with id', message)
      const cookie = {
        url: serverURL,
        name: 'userId',
        value: message,
        expirationDate: moment().add(7, 'days').unix()
      };
      console.log('cookie is', cookie)
      mainSession.cookies.set(cookie, (err) => {
        if (err) console.log('error setting cookies', err);
        else {
          mainSession.cookies.get({name: 'userId', serverURL}, (err, cookies) => {
            console.log('COOKIE SET!', cookies[0]);
            console.log('this should be 1 (no duplicate cookies)', cookies.length)
            if (cookies.length) mainWindow.sender.webContents.send('cookies', cookies[0]);
          })
        }
      });
    } else if (event === 'logout') {
      index.logoutAndQuit(mainSession);
      
    }
  })
}

const manageToken = (mainSession, mainWindow) => {
  ipcMain.on('token', (mainWindow, event, message) => {
    if(event === 'check') {
      mainSession.cookies.get({name: 'tokenId', serverURL}, (err, token) => {
        if(token) mainWindow.sender.webContents.send('token', token);
      })
    } else if (event === 'logged in'){
      const token = {
        url: serverURL,
        name: 'tokenId',
        value: message,
        expirationDate: moment().add(7, 'days').unix()
      }
      mainSession.cookies.set(token, (err) => {
        if(err) console.log('ERR SETTING TOKEN IN MANAGE SESSION: ', err);
        else {
          mainSession.cookies.get({name: 'tokenId', serverURL}, (err, token) => {
            if (token) mainWindow.sender.webContents.send('token', token);
          })
        }
      })
    }
  })
}

exports.manageCookies = manageCookies;
exports.manageToken = manageToken;

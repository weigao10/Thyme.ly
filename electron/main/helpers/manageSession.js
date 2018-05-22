const electron = require('electron')
const { app, BrowserWindow, ipcMain, session } = electron;
const { serverURL } = require('../config.js');

// const url = 'https://test-aws-thymely.com';
const moment = require('moment')

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
      // mainSession.clearStorageData();
      index.logoutAndQuit(mainSession);
      
    }
  })
}

exports.manageCookies = manageCookies;
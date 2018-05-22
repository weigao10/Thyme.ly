const electron = require('electron')
const { app, BrowserWindow, ipcMain, session } = electron;
const moment = require('moment')
const { serverURL } = require('../config.js');
const index = require('../index.js')

//handle whether user can skip login, needs to login, or handle user logout
const manageCookies = (mainSession, mainWindow) => {
  ipcMain.on('cookies', (mainWindow, event, message) => {

    if (event === 'check') {
      console.log('in manage cookies event is check', mainSession)
      mainSession.cookies.get({name: 'userId', serverURL}, (err, cookies) => {
        console.log('inside check get cookies')
        if (cookies.length) mainWindow.sender.webContents.send('cookies', cookies[0]);
        //if cookie does not exist, don't send it back
      });
    } else if (event === 'logged in') {
      const cookie = {
        url: serverURL,
        name: 'userId',
        value: message,
        expirationDate: moment().add(7, 'days').unix()
      };
      mainSession.cookies.set(cookie, (err) => {
        if (err) console.log('error setting cookies', err);
        else {
          mainSession.cookies.get({name: 'userId', serverURL}, (err, cookies) => {
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
  console.log('in manage token')
  ipcMain.on('token', (mainWindow, event, message) => {
    if(event === 'check') {
      console.log('in manage token event is check', mainSession)
      mainSession.token.get({name: 'tokenId', serverURL}, (err, token) => {
        console.log('inside check get token')
        if(token) mainWindow.sender.webContents.send('token', token);
        //if token does not exist, don't send back?
      })
    } else if (event === 'logged in'){
      console.log('in manage token event is logged in')
      const token = {
        url: serverURL,
        name: 'tokenId',
        value: message,
        expirationDate: moment().add(7, 'days').unix()
      }
      mainSession.token.set(token, (err) => {
        if(err) console.log('ERR SETTING TOKEN IN MANAGE SESSION: ', err);
        else {
          mainSession.token.get({name: 'tokenId', serverURL}, (err, token) => {
            if (token) mainWindow.sender.webContents.send('token', token);
          })
        }
      })
    }
  })
}


exports.manageCookies = manageCookies;
exports.manageToken = manageToken;
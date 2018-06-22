const electron = require('electron')
const { app, BrowserWindow, ipcMain, session } = electron;
const moment = require('moment');

const { serverURL } = require('../mainConfig.js');
const index = require('../index.js');

const manageCookies = (mainSession, mainWindow) => {
  ipcMain.on('cookies', (mainWindow, event, message) => {

    if (event === 'check') {
      mainSession.cookies.get({name: 'userId', serverURL}, (err, cookies) => {
        if (cookies.length) mainWindow.sender.webContents.send('cookies', cookies[0]);
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
  ipcMain.on('token', (mainWindow, event, message) => {
    if (event === 'check') {
      mainSession.cookies.get({name: 'tokenId', serverURL}, (err, token) => {
        if (token) mainWindow.sender.webContents.send('token', token);
      })
    } else if (event === 'logged in'){
      const token = {
        url: serverURL,
        name: 'tokenId',
        value: message,
        expirationDate: moment().add(7, 'days').unix()
      }
      mainSession.cookies.set(token, (err) => {
        if (err) console.log('ERR SETTING TOKEN IN MANAGE SESSION: ', err);
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

const electron = require('electron')
const { app, BrowserWindow, ipcMain, session } = electron;
const url = 'https://test-aws-thymely.com';
const moment = require('moment')

//handle whether user can skip login, needs to login, or handle user logout
const manageCookies = (mainSession) => {
  ipcMain.on('cookies', (mainWindow, event, message) => {
    console.log('event is', event);
    console.log('message is', message);

    if (event === 'check') {
      mainSession.cookies.get({name: 'userId', url}, (err, cookies) => {
        if (cookies.length) mainWindow.sender.webContents.send('cookies', cookies[0]);
        //if cookie does not exist, don't send it back
      });
    } else if (event === 'logged in') {
      console.log('user logged in with id', message)
      const cookie = {
        url,
        name: 'userId',
        value: message,
        secure: true,
        expirationDate: moment().add(7, 'days').unix()
      };
      mainSession.cookies.set(cookie, (err) => {
        if (err) console.log(err);
        else {
          mainSession.cookies.get({name: 'userId', url}, (err, cookies) => {
            console.log('COOKIE SET!', cookies[0]);
            console.log('this should be 1 (no duplicate cookies)', cookies.length)
            if (cookies.length) mainWindow.sender.webContents.send('cookies', cookies[0]);
          })
        }
      });
    } else if (event === 'logout') {
      mainSession.clearStorageData();
    }
  })
}

exports.manageCookies = manageCookies;
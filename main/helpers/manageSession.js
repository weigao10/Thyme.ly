const electron = require('electron')
const { app, BrowserWindow, ipcMain, session } = electron;
const url = 'https://test-aws-thymely.com';

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
        expirationDate: 1526605635 // use moment.js to set it for a few days from now
      };
      mainSession.cookies.set(cookie, (err) => {
        if (err) console.log(err);
        else {
          mainSession.cookies.get({name: 'userId', url}, (err, cookies) => {
            console.log('COOKIE SET!', cookies[0]);
            console.log('this should be 1 (no duplicate cookies)', cookies.length)
          })
        }
      });
    } else if (event === 'logged out') {
      console.log('COOKIE DESTROYED!')
      mainSession.clearStorageData();
    }
  })
}

exports.manageCookies = manageCookies;
const electron = require('electron')
const { app, BrowserWindow, ipcMain, session } = electron;
const url = 'https://test-aws-thymely.com';

//handle whether user can skip login, needs to login, or handle user logout
const manageCookies = (mainSession) => {
  ipcMain.on('cookies', (mainWindow, event, message) => {
    console.log('event is', event);
    console.log('message is', message);
    if (event === 'logged in') {
      console.log('user logged in with id', message)
      //SET COOKIE
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
            // console.log('cookies after setting cookies is', cookies);
            mainWindow.sender.webContents.send('cookies', cookies)
          })
        }
      });
    } else if (event === 'logged out') {
      mainSession.clearStorageData();
    } else if (event === 'check') {
      mainSession.cookies.get({name: 'userId', url}, (err, cookies) => {
        // console.log('cookies from inside manage session are', cookies);
        mainWindow.sender.webContents.send('cookies', cookies)
      });
    }
  })
}

exports.manageCookies = manageCookies;
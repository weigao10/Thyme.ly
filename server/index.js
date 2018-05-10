// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const app = express();
// const port = process.env.PORT || 3000;
// const db = require('../database/index.js');

// app.use(express.static(path.join(__dirname, '/../react-client/dist')));
// app.use(bodyParser.json());

// //update product class when cards are switched
// app.patch('/activities', (req, res) => {
//   // let newCategory = req.body.params.category;
//   let newCategory = 'neutral';

//   db.updateActivity(newCategory);
// })

// let server = app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

//sockets

// const io = require('socket.io')(server);
// exports.io = io;
// const {connectToSocket} = require('./helpers/activityData.js');
// connectToSocket(1000);
//start up process that sends new activities to client via sockets
//1000 is the interval of the active window monitor


const electron = require('electron');
const url = require('url');
const path = require('path');
const {monitor} = require('../server/helpers/activityData')

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow; 
let addWindow;

app.on('ready', () => {
  // console.log('path?', path.join(__dirname, '/../react-client/dist/index.html'))
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(url.format({ 
    pathname: path.join(__dirname, '/../react-client/dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', () => app.quit()) 

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  monitor(mainWindow)
}) 

// function createAddWindow(){
//   addWindow = new BrowserWindow({
//     width: 300,
//     height: 200,
//     title: "Add Shopping List Item"
//   });
//   addWindow.loadURL(url.format({
//     pathname: '/Users/weigao/Desktop/electron tutorial/addWindow.html',
//     protocol: 'file:',
//     slashes: true
//   }))

//   addWindow.on('close', () => addWindow = null) //for memory optimization
// }

const mainMenuTemplate = [
  //if mac, need an empty object here
  {
    label: 'File', 
    submenu: [ 
      {
        label: 'Add Item', 
        click(){
          createAddWindow();
        }
      }, 
      {
        label: 'Clear Items'
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        //darwin (mac), win32 (windows)
        click(){
          app.quit();
        }
      }
    ]
  }
]

if(process.platform === 'darwin'){
  mainMenuTemplate.unshift({});
}

//devtools
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools(); 
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}

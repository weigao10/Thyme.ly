const electron = require('electron');
const url = require('url');
const path = require('path');
const windowStateKeeper = require('electron-window-state')
const {monitor} = require('../server/helpers/activityData')

const { app, BrowserWindow, Menu, ipcMain, Tray, nativeImage } = electron;

let mainWindow, addWindow, tray;

const createTray = () => {
  let image = nativeImage.createFromPath('../icon.png')
//   // tray = new Tray('../thyme.png');
  tray = new Tray(image);
  tray.setToolTip('Thyme');
}

const createWindow = () => {
  let winState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 900
  })
  
  mainWindow = new BrowserWindow({
        width: winState.width,
        height: winState.height,
        x: winState.x,
        y: winState.y,
        minWidth: 400,
        minHeight: 300,
        show: false
        //make non resizable?
  });

  winState.manage(mainWindow);

  mainWindow.loadURL(url.format({ 
    pathname: path.join(__dirname, '/../react-client/dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.once('ready-to-show', () => mainWindow.show())

  mainWindow.on('closed', () => app.quit()) 

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  monitor(mainWindow)
}

app.on('ready', () => {
  createWindow();
  createTray();  
}) 

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
        role: 'toggledevtools',
        accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
      },
      {
        role: 'reload'
      }, {
        role: 'togglefullscreen'
      }
    ]
  })
}

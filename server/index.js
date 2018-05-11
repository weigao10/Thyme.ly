const electron = require('electron');
const url = require('url');
const path = require('path');
const windowStateKeeper = require('electron-window-state')
const {monitor} = require('../server/helpers/activityData')

const { app, BrowserWindow, Menu, ipcMain, Tray, nativeImage } = electron;

let mainWindow, addWindow, tray, splash;

const createTray = () => {
  let image = nativeImage.createFromPath('../icon.png')
//   // tray = new Tray('../thyme.png');
  tray = new Tray(image);
  tray.setToolTip('Thyme');
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  })
}

const createWindow = () => {
  let winState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 1000
  })
  splash = new BrowserWindow({
    width: 810, 
    height: 610, 
    transparent: 
    true,frame: false, 
    alwaysOnTop: true
  });
  splash.loadURL(url.format({ 
    pathname: path.join(__dirname, '/../react-client/dist/splash.html'),
    protocol: 'file:',
    slashes: true
  }))
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

  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
  })

  mainWindow.on('closed', () => app.quit()) 

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  monitor(mainWindow)
}

app.on('ready', () => {
  createWindow();
  createTray();  
  electron.powerMonitor.on('suspend', () => console.log('system going to sleep'));
  electron.powerMonitor.on('resume', () => console.log('system waking from sleep'));
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

const url = require('url');
const path = require('path');
const windowStateKeeper = require('electron-window-state')
const electron = require('electron')
const { app, BrowserWindow, Menu, Tray, nativeImage } = electron;

const {monitor} = require('../main/helpers/activityData.js');

let mainWindow, addWindow, tray, splash;
let force_quit = false;

const createTray = () => {
  let image = nativeImage.createFromPath(path.join(__dirname, '../iconTemplate.png'))
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
    transparent: true,
    frame: false, 
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

  mainWindow.on('close', function(e){
    if(!force_quit){
        e.preventDefault();
        mainWindow.hide();
    }
  });

  app.on('before-quit', function() {
    //save to fs
    force_quit = true;
    app.quit()
  });


  app.on('activate', function(){
    mainWindow.show();
  });

//   app.on('will-quit', function () {
//     // This is a good place to add tests insuring the app is still
//     // responsive and all windows are closed.
//     console.log("will-quit");
//     mainWindow = null;
// });

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
  },
  {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
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
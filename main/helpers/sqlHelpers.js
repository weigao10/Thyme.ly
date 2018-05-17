const { createTable, insertActivities, insertPreferences, getActivities, clearDb, closeDb } = require('../../server/database/sqlite.js')
const electron = require('electron')
const { ipcMain } = electron;


const populateStore = (mainWindow) => {
  createTable();
  getActivities((activities) => {
    mainWindow.send('sqlActivities', activities)
  });
  //getSpurts((spurts) => {
    //mainWindow.send('sqlSpurts', spurts)
  //})
}

const saveStoreToSql = (mainWindow) => {
  clearDb();
  mainWindow.send("windowClose", "close")
  ipcMain.once("store", (event, data) => {
    let allSpurts = []
    let { activities, preferences } = JSON.parse(data)
    console.log('store activities is', activities)
    for(let category in activities){
      if(category !== 'nextId'){
        activities[category].forEach((el) => {
          // console.log('inserting activity', el)
          insertActivities(el)
          allSpurts = [...allSpurts, ...el.spurts]
        })
      }
    }
    console.log('all spurts', allSpurts)
    // let allSpurts = [...]

    //need to save spurts as well
    for(let category in preferences){ //ex: category = trackedApps, el = Google Chrome
      preferences[category].forEach((el) => (insertPreferences(el, category)))
    }
  })
}


exports.populateStore = populateStore;
exports.saveStoreToSql = saveStoreToSql;
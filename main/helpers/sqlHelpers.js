const { createTable, insertActivities, insertPreferences, getActivities, insertSpurts, getSpurts, clearDb, closeDb } = require('../../server/database/sqlite.js')
const electron = require('electron')
const { ipcMain } = electron;


const populateStore = (mainWindow) => {
  let trackedApps = ['Google Chrome', 'Firefox', 'Safari']; //change to get prefs from db
  let newActivities;
  createTable();
  getActivities()
  .then((activities) => {
    newActivities = activities;
    return getSpurts()
  })
  .then((spurts) => {
    spurts.forEach((spurt) => {
      let isTracked = trackedApps.includes(spurt.app);
      for(let activity of newActivities){
        let query = isTracked ? 
                  spurt.title === activity.title && spurt.app === activity.app : 
                  spurt.app === activity.app

        if(query){
          activity.spurts = activity.spurts || []
          activity.spurts.push({
            startTime: spurt.startTime,
            endTime: spurt.endTime
          })
        }
      }
    })
    mainWindow.send('sqlActivities', newActivities)
  })

}

const saveStoreToSql = (mainWindow) => {
  clearDb();
  mainWindow.send("windowClose", "close")
  ipcMain.once("store", (event, data) => {
    let { activities, preferences } = JSON.parse(data)
    for(let category in activities){
      if(category !== 'nextId'){
        activities[category].forEach((el) => {
          el.spurts.forEach((spurt) => insertSpurts(el, spurt))
          insertActivities(el)
        })
      }
    }

    for(let category in preferences){ //ex: category = trackedApps, el = Google Chrome
      preferences[category].forEach((el) => (insertPreferences(el, category)))
    }
  })
}


exports.populateStore = populateStore;
exports.saveStoreToSql = saveStoreToSql;
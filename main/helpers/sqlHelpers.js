const { createTable, insertActivities, insertPreferences, getActivities, insertSpurts,
        getSpurts, clearDb, closeDb } = require('../../database/sqlite.js');
const { ipcMain } = require('electron');


const populateStore = (mainWindow) => {
  let trackedApps = ['Google Chrome', 'Firefox', 'Safari', 'Idle']; //change to get prefs from db
  let newActivities;
  createTable();
  getActivities()
    .then((activities) => {
      newActivities = activities.map(activityObj => {
        const mappedAct = {
          ...activityObj,
          productivity: {
            source: activityObj.source,
            class: activityObj.productivity
          }
        }
        const {source, ...noSource} = mappedAct;
        return noSource;
      });
      return getSpurts()
    })
    .then((spurts) => {
      spurts.forEach((spurt) => {
        let isTracked = trackedApps.includes(spurt.app);
        for (let activity of newActivities) {
          console.log('activity being loaded is', activity)
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
      console.log('activities inside populate store are', newActivities)
      mainWindow.send('sqlActivities', newActivities)
    })

}

const saveStoreToSql = (mainWindow) => {
  clearDb();
  mainWindow.send("windowClose", "close")
  ipcMain.once("store", (event, data) => {
    let { activities, preferences } = JSON.parse(data);
    console.log('the store upon window close is', data)
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
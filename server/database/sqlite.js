const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'sqlite.db')
const db = new sqlite3.Database(dbPath);
const Promise = require('bluebird')


//NEED TO ADD DATE COLUMN
const createTable = () => {
  console.log("createTable");
  db.run("CREATE TABLE IF NOT EXISTS activities (id INT, productivity TEXT, app TEXT, title TEXT, duration INT)")
  db.run("CREATE TABLE IF NOT EXISTS preferences (category TEXT, data TEXT)")
  db.run("CREATE TABLE IF NOT EXISTS spurts (id INT, productivity TEXT, app TEXT, title TEXT, startTime TEXT, endTime TEXT)")
}


//NEED TO ADD DATE COLUMN
const insertActivities = ({id, productivity, app, title, duration}) => {
  // db.run(`INSERT INTO activities(id, productivity, app, title, duration) VALUES(?, ?, ?, ?, ?)`, 
  // [id, productivity, app, title, duration], 
  // (err) => {
  //   if (err) return console.log('ERR IN SQLITE INSERT ACTIVITIES: ', err.message);
  //   console.log(`A row has been inserted into activities`);
  // });
  
  let query = `INSERT INTO activities(id, productivity, app, title, duration) VALUES(?, ?, ?, ?, ?)`;
  let params = [id, productivity, app, title, duration];
  return new Promise ((resolve, reject) => {
    db.run(query, params, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const insertPreferences = (data, category) => {
  // db.run(`INSERT INTO preferences(data, category) VALUES(?, ?)`, 
  // [data, category], 
  // (err) => {
  //   if (err) return console.log('ERR IN SQLITE INSERT PREFERENCES: ',err.message);
  //   console.log(`A row has been inserted into preferences`);
  // });

  let query = `INSERT INTO preferences(data, category) VALUES(?, ?)`;
  let params = [data, category];
  return new Promise ((resolve, reject) => {
    db.run(query, params, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

//NEED TO ADD DATE
const insertSpurts = ({id, productivity, app, title}, {startTime, endTime}) => {
  console.log('insert spurt');

  // db.run(`INSERT INTO spurts(id, productivity, app, title, startTime, endTime) VALUES(?, ?, ?, ?, ?, ?)`, 
  // [id, productivity, app, title, startTime, endTime], 
  // (err) => {
  //   if (err) return console.log('ERR IN SQLITE INSERT SPURTS: ',err.message);
  //   console.log(`A row has been inserted into spurts`);
  // });
  let query = `INSERT INTO spurts(id, productivity, app, title, startTime, endTime) VALUES(?, ?, ?, ?, ?, ?)`;
  let params = [id, productivity, app, title, startTime, endTime];
  return new Promise ((resolve, reject) => {
    db.run(query, params, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const getActivities = () => {
  console.log("get activities");
  let query = `SELECT id, productivity, app, title, duration FROM activities`;

  return new Promise ((resolve, reject) => {
    db.all(query, [], (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const getSpurts = (cb) => {
  console.log("get spurts");
  let query = `SELECT id, productivity, app, title, startTime, endTime FROM spurts`;
  // db.all(query, [], (err, rows) => {
  //   if (err) return console.log('ERR IN SQLITE GET SPURTS: ',err.message);
  //   cb(rows)
  // });

  return new Promise ((resolve, reject) => {
    db.all(query, [], (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const clearDb = () => {
  console.log('clear db')
  db.run(`DELETE FROM activities`);
  db.run(`DELETE FROM preferences`);
  db.run(`DELETE FROM spurts`);
}

const closeDb = () => {
    console.log("closeDb");
    db.close();
}

exports.createTable = createTable;
exports.insertActivities = insertActivities;
exports.insertPreferences = insertPreferences;
exports.insertSpurts = insertSpurts;
exports.getSpurts = getSpurts;
exports.getActivities = getActivities;
exports.clearDb = clearDb;
exports.closeDb = closeDb;
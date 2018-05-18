const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'sqlite.db')
const db = new sqlite3.Database(dbPath);
const Promise = require('bluebird')
const moment = require('moment')
let date = moment().format('YYYY-MM-DD')


//PRODUCTIVITY NOW IS AN OBJ LIKE THIS
//{ class: 'productive', source: 'user' }
//NEED TO ADD DATE COLUMN
const createTable = () => {
  console.log("createTable");
  db.run("CREATE TABLE IF NOT EXISTS activities (id INT, date DATE, productivity TEXT, app TEXT, title TEXT, duration INT)")
  db.run("CREATE TABLE IF NOT EXISTS preferences (category TEXT, data TEXT)")
  db.run("CREATE TABLE IF NOT EXISTS spurts (id INT, date DATE, productivity TEXT, app TEXT, title TEXT, startTime TEXT, endTime TEXT)")
}

//NEED TO ADD DATE COLUMN
const insertActivities = ({id, productivity, app, title, duration}) => {
  console.log('date is', date)
  let query = `INSERT INTO activities(id, date, productivity, app, title, duration) VALUES(?, ?, ?, ?, ?, ?)`;
  let params = [id, date, productivity, app, title, duration];
  return new Promise ((resolve, reject) => {
    db.run(query, params, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const insertPreferences = (data, category) => {
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
  //PRODUCTIVITY NOW IS AN OBJ LIKE THIS
  //{ class: 'productive', source: 'user' }
  console.log('insert spurt');
  let query = `INSERT INTO spurts(id, date, productivity, app, title, startTime, endTime) VALUES(?, ?, ?, ?, ?, ?, ?)`;
  let params = [id, date, productivity, app, title, startTime, endTime];
  console.log('productivity inside insert spurts is', productivity)
  return new Promise ((resolve, reject) => {
    db.run(query, params, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const getActivities = () => {
  console.log("get activities");
  let query = `SELECT id, date, productivity, app, title, duration FROM activities`;
  return new Promise ((resolve, reject) => {
    db.all(query, [], (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const getSpurts = (cb) => {
  console.log("get spurts");
  let query = `SELECT id, date, productivity, app, title, startTime, endTime FROM spurts`;
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
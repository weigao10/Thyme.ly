const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'sqlite.db')
const db = new sqlite3.Database(dbPath);


//NEED TO ADD DATE COLUMN
const createTable = () => {
  console.log("createTable");
  db.run("CREATE TABLE IF NOT EXISTS activities (id INT, category TEXT, app TEXT, title TEXT, duration INT)")
  db.run("CREATE TABLE IF NOT EXISTS preferences (category TEXT, data TEXT)")
  db.run("CREATE TABLE IF NOT EXISTS spurts (id INT, category TEXT, app TEXT, title TEXT, startTime TEXT, endTime TEXT)")
}

//NEED TO ADD DATE COLUMN
const insertActivities = ({id, productivity, app, title, duration}) => {
  db.run(`INSERT INTO activities(id, category, app, title, duration) VALUES(?, ?, ?, ?, ?)`, 
  [id, productivity, app, title, duration], 
  (err) => {
    if (err) return console.log(err.message);
    console.log(`A row has been inserted into activities`);
  });
}

const insertPreferences = (data, category) => {
  db.run(`INSERT INTO preferences(data, category) VALUES(?, ?)`, 
  [data, category], 
  (err) => {
    if (err) return console.log(err.message);
    console.log(`A row has been inserted into preferences`);
  });
}

//NEED TO ADD DATE
const insertSpurts = ({id, productivity, app, title, startTime, endTime}) => {
  db.run(`INSERT INTO spurts(id, category, app, title, startTime, endTime) VALUES(?, ?, ?, ?, ?, ?)`, 
  [id, productivity, app, title, startTime, endTime], 
  (err) => {
    if (err) return console.log(err.message);
    console.log(`A row has been inserted into spurts`);
  });
}

const getActivities = () => {
    console.log("get activities");
    let query = `SELECT id, category, app, title, duration FROM activities`;

    db.all(query, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach(row => {
        console.log(row);
      });
    });
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
exports.getActivities = getActivities;
exports.clearDb = clearDb;
exports.closeDb = closeDb;
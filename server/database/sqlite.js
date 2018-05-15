const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sqlite.db');

export function createDb() {
    console.log("createDb");
    const db = new sqlite3.Database('./sqlite.db');
}


export function createTable() {
  console.log("createTable");
  db.run("CREATE TABLE IF NOT EXISTS activities (id INT, category TEXT, app TEXT, title TEXT, duration INT)")
  // db.run("CREATE TABLE IF NOT EXISTS preferences (category TEXT, data TEXT)")
  // db.run("CREATE TABLE IF NOT EXISTS spurts (id INT, category TEXT, app TEXT, title TEXT, startTime TEXT, endTime TEXT)")
}

export function insertActivities({id, productivity, app, title, duration}) {
  console.log("insertRows")

  db.run(`INSERT INTO activities(id, category, app, title, duration) VALUES(?, ?, ?, ?, ?)`, 
  [id, productivity, app, title, duration], 
  (err) => {
    if (err) return console.log(err.message);
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
}

export function readAllRows() {
    console.log("readAllRows");
    // db.all("SELECT rowid AS id, info FROM lorem", function(err, rows) {
    //     rows.forEach(function (row) {
    //         console.log(row.id + ": " + row.info);
    //     });
    // });
}

export function closeDb() {
    console.log("closeDb");
    db.close();
}
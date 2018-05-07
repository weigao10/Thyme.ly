const chalk = require('chalk');
const { Pool, Client } = require('pg')

//Create connection to AWS database

const pool = new Pool({
  user: 'senior',
  host: 'productivity-app.cmqyrbiaigty.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'hackreactor',
  port: 5432,
})

const client = new Client({
  user: 'senior',
  host: 'productivity-app.cmqyrbiaigty.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'hackreactor',
  port: 5432,
})

//----Activity Helper Functions----

const getActivities = () => {
  let query = `SELECT * FROM public.activities;`;

  pool.query(query)
  .then((data) => console.log( chalk.black.bgYellow(JSON.stringify(data.rows))))
  .catch((err) => console.log( chalk.red.bgYellow(err)));

}

const insertActivity = () => {
  let query = 
  `INSERT INTO public.activities
    VALUES ('1999-01-08 04:05:06', '1999-01-08 04:05:06', 'chrome', 'reddit', 'abc', 'xyz', 'www.random.com');`;

    pool.query(query)
    .then((data) => console.log( chalk.black.bgGreen(JSON.stringify(data))) )
    .catch((err) => console.log( chalk.red.bgGreen(err)));
}

const updateActivity = (activity_id, newCategory) => {
  let query = 
  `UPDATE public.activities
	SET category='${newCategory}'
  WHERE activity_id='${activity_id};`
  
  pool.query(query)
  .then((data) => console.log( chalk.black.bgBlue(JSON.stringify(data))) )
  .catch((err) => console.log( chalk.red.bgBlue(err)));

}

const deleteActivity = () => {
  let query = 
  `DELETE FROM public.activities'
  WHERE app_name='chrome';`
  
  pool.query(query)
  .then((data) => console.log( chalk.black.bgRed(JSON.stringify(data))) )
  .catch((err) => console.log( chalk.red.bgRed(err)));
}


//----Users Helper Functions----

const getUsers = () => {
  let query = `SELECT * FROM public.users;`;

  pool.query(query)
  .then((data) => console.log( chalk.black.bgYellow(JSON.stringify(data))))
  .catch((err) => console.log( chalk.red.bgYellow(err)));
} 

const insertUser = () => {
  let query = 
  `INSERT INTO public.users(
    username, hash, user_id)
    VALUES ('johndoe1', null, '2');`;

  pool.query(query)
  .then((data) => console.log( chalk.black.bgGreen(JSON.stringify(data))) )
  .catch((err) => console.log( chalk.red.bgGreen(err)));
}

const updateUser = () => {
  let query = 
  `UPDATE public.users
	SET username='janedoe1'
	WHERE username='johndoe1';`;

  pool.query(query)
  .then((data) => console.log( chalk.black.bgBlue(JSON.stringify(data))) )
  .catch((err) => console.log( chalk.red.bgBlue(err)));

}

const deleteUser = () => {
  let query = 
  `DELETE FROM public.users
	WHERE username='janedoe1';`;

  pool.query(query)
  .then((data) => console.log( chalk.white.bgRed(JSON.stringify(data))) )
  .catch((err) => console.log( chalk.red.bgRed(err)) );
}

//----User Metrics Helper Functions----

/*

To be filled out later

*/

//----Pomodoro Preferences Helper Functions----

/*

To be filled out later

*/


//----Errors Helper Functions----

const getErrors = () => {
  let query = 
  `SELECT * FROM public.errors;`

  pool.query(query)
  .then((data) => console.log( chalk.black.bgYellow(JSON.stringify(data))) )
  .catch((err) => console.log( chalk.red.bgYellow(err)));

}

const insertError = () => {
  let query = 
  `INSERT INTO public.errors(error_msg)
  VALUES ('this is a sample message');`
  
  pool.query(query)
  .then((data) => console.log( chalk.black.bgGreen(JSON.stringify(data))) )
  .catch((err) => console.log( chalk.red.bgGreen(err)));

}

insertActivity();
getActivities();

//close the connection
pool.end();





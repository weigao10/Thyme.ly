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

  pool.query(query, (err, res) => {
    if (err) {
      // console.log( chalk.black.bgYellow('error is', err.stack) );
 

    } else {
      // console.log( chalk.black.bgYellow(JSON.stringify(res)) );
    }
  })

}

const insertActivity = () => {
  let query = 
  `INSERT INTO public.activities
    VALUES (1, 2:30, 2:31, 'chrome', 'reddit', 'abc', 'xyz', 'www.random.com');`;

  pool.query(query, (err, res) => {
    if (err) {
      console.log( chalk.black.bgGreen('error is', err.stack) );
 

    } else {
      console.log( chalk.black.bgGreen(JSON.stringify(res)) );
    }
  })
}

const updateActivity = () => {
  let query = 
  `UPDATE public.activities
	SET app_name='random app'
  WHERE app_name='chrome';`
  
  pool.query(query, (err, res) => {
    if (err) {
      console.log( chalk.white.bgBlue('error is', err.stack) );
 

    } else {
      console.log( chalk.white.bgBlue(JSON.stringify(res)) );
    }
  })

}

const deleteActivity = () => {
  let query = 
  `DELETE FROM public.activities'
  WHERE app_name='chrome';`
  
  pool.query(query, (err, res) => {
    if (err) {
      console.log( chalk.white.bgRed('error is', err.stack) );
 

    } else {
      console.log( chalk.white.bgRed(JSON.stringify(res)) );
    }
  })
}


//----Users Helper Functions----

const getUsers = () => {
  let query = `SELECT * FROM public.users;`;

  pool.query(query, (err, res) => {
    if (err) {
      // console.log( chalk.black.bgYellow('error is', err.stack) );
 

    } else {
      // console.log( chalk.black.bgYellow(JSON.stringify(res)) );
    }
  })
} 

const insertUser = () => {
  let query = 
  `INSERT INTO public.users(
    username, hash, user_id)
    VALUES ('johndoe1', null, '2');`;

  pool.query(query, (err, res) => {
    if (err) {
      console.log( chalk.black.bgGreen('error is', err.stack) );

    } else {
      console.log( chalk.black.bgGreen(JSON.stringify(res)) );
    }
  })
}

const updateUser = () => {
  let query = 
  `UPDATE public.users
	SET username='janedoe1'
	WHERE username='johndoe1';`;

  pool.query(query, (err, res) => {
    if (err) {
      console.log( chalk.white.bgBlue('error is', err.stack) );

    } else {
      console.log( chalk.white.bgBlue(JSON.stringify(res)) );
    }
  })

}

const deleteUser = () => {
  let query = 
  `DELETE FROM public.users
	WHERE username='janedoe1';`;

  pool.query(query, (err, res) => {
    if (err) {
      console.log( chalk.white.bgRed('error is', err.stack) );

    } else {
      console.log( chalk.white.bgRed(JSON.stringify(res)) );
    }
  })
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
  
  pool.query(query, (err, res) => {
    if (err) {
      // console.log( chalk.black.bgYellow('error is', err.stack) );
 

    } else {
      // console.log( chalk.black.bgYellow(JSON.stringify(res)) );
    }
  })

}

const insertError = () => {
  let query = 
  `INSERT INTO public.errors(error_msg)
  VALUES ('testing this out and this is a sample message');`
  
  pool.query(query, (err, res) => {
    if (err) {
      console.log( chalk.black.bgGreen('error is', err.stack) );
 

    } else {
      console.log( chalk.black.bgGreen(JSON.stringify(res)) );
    }
  })
}

// insertError();
getErrors();

//close the connection
pool.end();





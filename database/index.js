const { Pool, Client } = require('pg')

// const pool = new Pool({
//   user: 'senior',
//   host: 'productivity-app.cmqyrbiaigty.us-east-2.rds.amazonaws.com',
//   database: 'postgres',
//   password: 'hackreactor',
//   port: 5432,
// })

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

const client = new Client({
  user: 'senior',
  host: 'productivity-app.cmqyrbiaigty.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'hackreactor',
  port: 5432,
})

client.connect()

client.query('SELECT NOW() as now', (err, res) => {
  if (err) {
    console.log('error is', err.stack)
  } else {
    console.log(res.rows[0])
  }
})
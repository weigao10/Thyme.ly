const { pool } = require('./index.js')

const getBrowserActivities = () => {
  //expand to other browsers!
  const queryStr = `select app_name, window_title, prod_class from public.categories where app_name = 'Google Chrome'`;
  return pool.query(queryStr)
    .then(data => data.rows)
    .catch(err => console.error('error getting all browser titles', err))
}

exports.getBrowserActivities = getBrowserActivities;
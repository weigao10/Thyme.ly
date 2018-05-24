const pgp = require('pg-promise')({
  capSQL: true
});
const { pool } = require('./index.js')

const getBrowserActivities = () => {
  //expand to other browsers!
  const queryStr = `select app_name, window_title, prod_class from public.categories where app_name = 'Google Chrome'`;
  return pool.query(queryStr)
    .then(data => data.rows)
    .catch(err => console.error('error getting all browser titles', err))
};

const addScrapingResults = async (titles, prod_class) => {
  console.log('prod class inside db function is', prod_class);
  const lastScrapeSession = await pool.query(`SELECT scrape_session FROM public.scrape_categories 
                                             ORDER BY scrape_session DESC LIMIT 1`)
  console.log('last scrape sesh was', lastScrapeSession.rows[0].scrape_session);
  const queryStr = `insert into public.scrape_categories(scrape_session, window_title, prod_class, app_name)
                values($1, $2, $3, 'Google Chrome')`;
  titles.map((title) => {
    const values = [lastScrapeSession.rows[0].scrape_session + 1, title, prod_class];
    return pool.query(queryStr, values)
      .catch(e => console.log('error trying to save scraping results', e));
  });
  console.log('success!')
}

exports.getBrowserActivities = getBrowserActivities;
exports.addScrapingResults = addScrapingResults;
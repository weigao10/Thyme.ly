const puppeteer = require('puppeteer');
const db = require('../database/scraper.js');
const fs = require('fs'); //for testing only!

// db.getBrowserActivities().then(data => console.log(data));

function sleep(ms) {
  return new Promise(resolve => {
      setTimeout(resolve,ms)
  })
}

const scrapeYoutubeTitles = async (url, prod_class, headless) => {
  const browser = await puppeteer.launch({headless: headless})
  const page = await browser.newPage()
  await page.goto(url)
  for (let i = 0; i < 200; i++) {
    page.keyboard.down("PageDown");
    page.keyboard.up("PageDown")
    await sleep(200);
    // console.log(i);
    //TODO: Detect if it's reached the end of the page
  }

  await page.waitFor(1000);

  const result = await page.evaluate(() => {
    let titles = [];
    const elements = document.querySelectorAll('#video-title');
    for (let element of elements) {
      const title = element.innerText;
      titles.push(title);
    }
    return titles;
  });

  await browser.close();
  console.log(result)
  db.addScrapingResults(result, prod_class);
  // const db = require('./database/index.js');
  // fs.writeFileSync('./titles.txt', result.join('\n') + '\n') //TODO: Save to db, not to file
}

const scrapeMediumTitles = async (url, prod_class, headless = true) => {
  const browser = await puppeteer.launch({headless: headless})
  const page = await browser.newPage()
  await page.goto(url)
  for (let i = 0; i < 400; i++) {
    page.keyboard.down("PageDown");
    page.keyboard.up("PageDown")
    await sleep(200);
    // console.log(i);
    //TODO: Detect if it's reached the end of the page
  }

  await page.waitFor(1000);

  const result = await page.evaluate(() => {
    let titles = [];
    const className = '.graf--title'
    const elements = document.querySelectorAll(className);
    for (let element of elements) {
      const title = element.innerText;
      titles.push(title);
    }
    return titles;
  });

  await browser.close();
  console.log(result)
  db.addScrapingResults({titles: result, prod_class, url});
  // const db = require('./database/index.js');
  // fs.writeFileSync('./titles.txt', result.join('\n') + '\n') //TODO: Save to db, not to file
}


const url = 'https://medium.com/front-end-hacking/tagged/javascript';
const prod_class = 'productive';
scrapeMediumTitles(url, prod_class, true);

// const url = 'https://www.youtube.com/channel/UCOf7UPMHBjAavgD0Qw5q5ww/videos';
// const prod_class = 'productive';
// scrapeYoutubeTitles(url, prod_class, true);
// scrapeYoutubeTitles('https://www.youtube.com/user/TechGuyWeb/videos?view=0&sort=dd&shelf_id=1')

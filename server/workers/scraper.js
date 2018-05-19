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
    console.log(i);
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
  // const db = require('./database/index.js');
  fs.writeFileSync('./titles.txt', result.join('\n') + '\n') //TODO: Save to db, not to file
}

const url = 'https://www.youtube.com/user/TechGuyWeb/videos?view=0&sort=dd&shelf_id=1'
scrapeYoutubeTitles(url, false);
// scrapeYoutubeTitles('https://www.youtube.com/user/TechGuyWeb/videos?view=0&sort=dd&shelf_id=1')

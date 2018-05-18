const puppeteer = require('puppeteer');

const scrapeYoutubeChannel = async (url) => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  await page.goto(url);

  const result = await page.evaluate(() => {
    let data = [];
    const elements = document.querySelectorAll('#video-title');

    for (let element of elements) {
        const title = element.innerText;
        data.push(title);
    }
    return data;
  });

  browser.close();
  return result;
};

scrapeYoutubeChannel('https://www.youtube.com/user/TechGuyWeb/video').then((value) => {
    console.log(value); // Success!
});
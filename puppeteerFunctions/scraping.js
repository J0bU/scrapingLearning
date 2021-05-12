const puppeteer = require('puppeteer');

const countriesMenu =
  'body > header > div.container.header.pb-5 > div.d-flex.justify-content-between > div.d-none.d-lg-block > a:nth-child(1)';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setDefaultTimeout(60000);
  await page.setViewport({
    width: 1000,
    height: 400
  });
  await page.goto('https://holidayapi.com/', { waitUntil: 'load' });
  await page.screenshot({ path: 'example.png' });
  await page.click(countriesMenu);
  await page.waitForSelector('#countries > tbody > tr');
  // let result = await page.$$('#countries > tbody > tr');
  const divCount = await page.$('div');
  console.log('🚀 ~ file: scraping.js ~ line 20 ~ divCount', divCount);

  // console.log('🚀 ~ file: scraping.js ~ line 18 ~ result', result.);

  // await browser.close();
})();

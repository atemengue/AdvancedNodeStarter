/** @format */
const puppeteer = require('puppeteer');

test('adds two numbers', () => {
  const sum = 1 + 2;

  expect(sum).toEqual(3);
});

test('We can launch a browser', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium-browser'
  });
  const page = await browser.newPage();

  await page.goto('localhost:3000');

  const text = await page.$eval('a.brand-logo', el => el.innerHTML);

  expect(text).toEqual('Blogster');
});

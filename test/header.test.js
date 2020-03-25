/** @format */
const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/chromium-browser'
  });
  page = await browser.newPage();
  await page.goto('localhost:3000');
});

test('adds two numbers', () => {
  const sum = 1 + 2;

  expect(sum).toEqual(3);
});

test('the header has the correct test', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);

  expect(text).toEqual('Blogster');
});

test('clicking login and start google authFlow', async () => {
  await page.click('.right a');
  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('when signed in, show the logout button', async () => {
  const id = '5e69927c4c341c33ee3b6b09';
  const Buffer = require('safe-buffer').Buffer;
  const sessionObject = {
    passport: {
      user: id
    }
  };
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    'base64'
  );

  const Keygrip = require('keygrip');
  const keys = require('../config/keys');
  const keygrip = new Keygrip([keys.cookieKey]);
  const sig = keygrip.sign('session=' + sessionString);

  console.log(sessionString, sig); // generating Sessions and Signatures
});

afterEach(async () => {
  await browser.close();
});

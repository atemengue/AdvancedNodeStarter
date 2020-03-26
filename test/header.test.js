/** @format */
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/UserFactory');
const Page = require('../helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
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
  const user = await userFactory();
  const { session, sig } = sessionFactory(user);

  //console.log(sessionString, sig); // generating Sessions and Signatures

  await page.setCookie({ name: 'session', value: session });
  await page.setCookie({ name: 'session.sig', value: sig });
  await page.goto('localhost:3000');
  await page.waitFor('a[href="/auth/logout"]');

  const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

  expect(text).toEqual('Logout');
});

afterEach(async () => {
  await page.close();
});

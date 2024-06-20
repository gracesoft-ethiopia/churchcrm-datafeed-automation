import fs from 'fs';
import csv from 'csv-parser';
import { Browser, Builder, By, Key } from 'selenium-webdriver';
import dotenv from 'dotenv';
import loginUser from './loginuser.js';

dotenv.config();

const SYSTEM_BASE_URL = 'https://crm.amskhc.org';

const members = [];

let driver = await new Builder().forBrowser(Browser.CHROME).build();

await driver.get(SYSTEM_BASE_URL);

await loginUser(driver, `${SYSTEM_BASE_URL}/PersonEditor`);

fs.createReadStream('assets/members.csv')
  .pipe(csv())
  .on('data', (data) => {
    members.push(data);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

await setTimeout(() => {
  driver.quit();
}, 5000);

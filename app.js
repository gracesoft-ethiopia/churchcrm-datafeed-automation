import fs from 'fs';
import csv from 'csv-parser';
import { Browser, Builder } from 'selenium-webdriver';
import dotenv from 'dotenv';
import loginUser, { exitBrowser, saveMember } from './actions.js';

dotenv.config();

const members = [];

let driver = await new Builder().forBrowser(Browser.CHROME).build();

await driver.get(process.env.BASEURL);

await loginUser(driver);

await driver.get(`${process.env.BASEURL}/PersonEditor`);

fs.createReadStream('assets/members.csv')
  .pipe(csv())
  .on('data', async (data) => {
    if (data['ተ.ቁ'] !== '') {
      members.push(data);
    }
  })
  .on('end', async () => {
    await saveMember(driver, members[0]);
    console.log(members);
  });

exitBrowser(driver);

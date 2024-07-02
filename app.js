import fs from 'fs';
import csv from 'csv-parser';
import { Browser, Builder } from 'selenium-webdriver';
import dotenv from 'dotenv';
import loginUser, { exitBrowser, saveMember, saveFamily } from './actions.js';

dotenv.config();

let currentFamily = 0;
const members = [];

const driver = await new Builder().forBrowser(Browser.CHROME).build();

await driver.get(process.env.BASEURL);

await loginUser(driver);

await fs
  .createReadStream('assets/members.csv')
  .pipe(csv())
  .on('data', async (data) => {
    members.push(data);
  })
  .on('end', async () => {
    for (const data of members) {
      console.log(data);
      if (data['ተ.ቁ'] !== '') {
        currentFamily = await saveFamily(driver, data);
      }
      await saveMember(driver, data, currentFamily);
    }
  });

// exitBrowser(driver);

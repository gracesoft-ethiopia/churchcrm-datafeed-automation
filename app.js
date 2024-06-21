import fs from 'fs';
import csv from 'csv-parser';
import { Browser, Builder, By, until } from 'selenium-webdriver';
import dotenv from 'dotenv';
import loginUser, { exitBrowser, saveMember, saveFamily } from './actions.js';

dotenv.config();

let currentFamily = 0;
const members = [];

const driver = await new Builder().forBrowser(Browser.CHROME).build();

await driver.get(process.env.BASEURL);

await loginUser(driver);

fs.createReadStream('assets/members.csv')
  .pipe(csv())
  .on('data', async (data) => {
    members.push(data);
  })
  .on('end', async () => {
    currentFamily = await saveFamily(driver, members[0]);
    await saveMember(driver, members[0], currentFamily);

    // members.forEach((data) => {
    //   if (data['ተ.ቁ'] !== '') {
    //     currentFamily = saveFamily(driver, data);
    //   }
    //   saveMember(driver, data, currentFamily);
    // });
  });

// exitBrowser(driver);

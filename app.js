import fs from 'fs';
import csv from 'csv-parser';
import { Browser, Builder, By, Key } from 'selenium-webdriver';
import dotenv from 'dotenv';

dotenv.config();

const SYSTEM_BASE_URL = 'https://crm.amskhc.org';

const members = [];

let driver = await new Builder().forBrowser(Browser.CHROME).build();
await driver.get(SYSTEM_BASE_URL);

fs.createReadStream('assets/members.csv')
  .pipe(csv())
  .on('data', (data) => {
    members.push(data);
  })
  .on('end', async () => {
    const loginForm = await driver.findElement(By.name('LoginForm'));
    const username = await driver.findElement(By.name('User'));
    const password = await driver.findElement(By.name('Password'));

    await username.sendKeys(process.env.CRMUSER);
    await password.sendKeys(process.env.CRMPWD);
    await loginForm.submit();
  });

await setTimeout(() => {
  driver.quit();
}, 5000);

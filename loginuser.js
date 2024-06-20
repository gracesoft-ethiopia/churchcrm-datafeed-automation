import { By } from 'selenium-webdriver';

export default async function loginUser(driver, loggedinurl) {
  const loginForm = await driver.findElement(By.name('LoginForm'));
  const username = await driver.findElement(By.name('User'));
  const password = await driver.findElement(By.name('Password'));

  await username.sendKeys(process.env.CRMUSER);
  await password.sendKeys(process.env.CRMPWD);
  await loginForm.submit();

  await driver.get(loggedinurl);
  await driver.sleep(1000);
}

export async function exitBrowser(driver) {
  await driver.sleep(1000);
  await driver.quit();
}

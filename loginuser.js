import { By, Select } from 'selenium-webdriver';

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

export async function saveMember(driver, member) {
  const gender = await driver.findElement(By.name('Gender'));
  const firstName = await driver.findElement(By.name('FirstName'));
  const middleName = await driver.findElement(By.name('MiddleName'));
  const lastName = await driver.findElement(By.name('LastName'));
  const saveButton = await driver.findElement(By.name('PersonSubmitAndAdd'));

  // select object creation for select fields
  const genderSelect = new Select(gender);

  console.log(member);

  await genderSelect.selectByVisibleText(member['Gender']);
  await firstName.sendKeys(member['First name']);
  await middleName.sendKeys(member['Middle Name']);
  await lastName.sendKeys(member['Last Name']);

  // await saveButton.click();
  await driver.sleep(1000);
}

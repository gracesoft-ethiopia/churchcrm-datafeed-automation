import { By, Select } from 'selenium-webdriver';

export default async function loginUser(driver) {
  const loginForm = await driver.findElement(By.name('LoginForm'));
  const username = await driver.findElement(By.name('User'));
  const password = await driver.findElement(By.name('Password'));

  await username.sendKeys(process.env.CRMUSER);
  await password.sendKeys(process.env.CRMPWD);
  await loginForm.submit();

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
  const birthMonth = await driver.findElement(By.name('BirthMonth'));
  const birthDay = await driver.findElement(By.name('BirthDay'));
  const birthYear = await driver.findElement(By.name('BirthYear'));

  const saveButton = await driver.findElement(By.name('PersonSubmitAndAdd'));

  // select object creation for select fields
  const genderSelect = new Select(gender);
  const birthMonthSelect = new Select(birthMonth);
  const birthDaySelect = new Select(birthDay);

  birthYear.clear();
  console.log(member);

  await genderSelect.selectByVisibleText(member['Gender']);
  await firstName.sendKeys(member['First name']);
  await middleName.sendKeys(member['Middle Name']);
  await lastName.sendKeys(member['Last Name']);
  await birthMonthSelect.selectByValue(randomToString(getRandomNumber(1, 12)));
  await birthDaySelect.selectByVisibleText(getRandomNumber(1, 28).toString());
  await birthYear.sendKeys(member['Birth Year']);

  // await saveButton.click();
  await driver.sleep(2000);
}

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomToString = (random) => {
  if (random < 10) {
    return `0${random}`;
  }

  return random.toString();
};

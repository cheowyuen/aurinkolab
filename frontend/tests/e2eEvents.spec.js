import { By, Builder, until } from 'selenium-webdriver';
import assert from "assert";


/**Test case for verifying the events link and then retrieve all of the events */

describe('Element Information Test', function () {
  let driver;
  
  before(async () => {
    // Set up Chrome options
    // Build WebDriver instance
    driver = await new Builder()
        .forBrowser('chrome')
        .usingServer('http://chrome:4444/wd/hub') // Change URL if needed
        .build();
});
  
  beforeEach(async ()=> {
    await driver.get('http://frontend:5173/');
  })
  
  it('Check the title of the website', async function () {
    
    let result =  await driver.getTitle();
    
    assert.equal("AurinkoLab", result); 
  });
  
  it('Check if apply button works', async function () {
    

    await driver.manage().setTimeouts({implicit: 500});
    let applyButton =  await driver.findElement(By.id('apply-nav-bar'));

    await driver.wait(until.elementIsVisible(applyButton));
   
   await applyButton.click(); 

    let currentUrl = await driver.getCurrentUrl();
    
    
    assert.equal(currentUrl, 'http://frontend:5173/events')
    
  });
  
  it('Check the events and return a list of on going events available at the website.', async function () {
    // Resolves Promise and returns boolean value

    await driver.manage().setTimeouts({implicit: 500});
    let applyButton =  await driver.findElement(By.id('apply-nav-bar'));

    await driver.wait(until.elementIsVisible(applyButton));
   
   await applyButton.click(); 

   let result =  await driver.findElement(By.id("ongoing-events")).isDisplayed();
    
    let element = driver.findElement(By.css("div"));
    let elements = await element.findElements(By.css("p"));

    

    
    for(let e of elements) {
        
      console.log(await e.getText());
      } 
    
    assert.equal(result, true)
    
  });
  
  
  after(async () => await driver.quit());
});



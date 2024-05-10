
const {By, Builder, until} = require('selenium-webdriver');
const assert = require("assert");


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
  
  it('Check if quiz button works', async function () {
    

    await driver.manage().setTimeouts({implicit: 500});
    let quizButton =  await driver.findElement(By.id('quiz-nav-bar'));

    await driver.wait(until.elementIsVisible(quizButton));
   
   await quizButton.click(); 

    let currentUrl = await driver.getCurrentUrl();
    
    
    assert.equal(currentUrl, 'http://frontend:5173/entrytest')
    
  });
  
  it('Check the quiz and return a list of questions available per page.', async function () {
  

    await driver.manage().setTimeouts({implicit: 500});
    let quizButton =  await driver.findElement(By.id('quiz-nav-bar'));

    await driver.wait(until.elementIsVisible(quizButton));
   
   await quizButton.click(); 

    let currentUrl = await driver.getCurrentUrl();
    
    let element = driver.findElement(By.className("questions"));
    let elements = await element.findElements(By.className("individual-question"));

    let result =  await driver.findElement(By.className("individual-question")).isDisplayed();

    console.log("number of questions per page: ", elements.length)

    
    for(let e of elements) {
        
      console.log(await e.getText());
      } 

  
    
    assert.equal(elements.length, "6")
    
  });
  
  
  after(async () => await driver.quit());

});

const { By, Builder, until } = require('selenium-webdriver');
const assert = require("assert");
const chrome = require('selenium-webdriver/chrome');

/** test case for mobile devise dimensions, google emulations of a mobile devise */

describe('Element Information Test', function () {
    let driver;

    before(async () => {
        // Set up Chrome options
        // Build WebDriver instance
        const options = new chrome.Options();

        /**Specify the device you want to emulate */
        options.setMobileEmulation({ deviceName: 'Samsung Galaxy S8+' }); 

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .usingServer('http://chrome:4444/wd/hub') // Change URL if needed
            .build();
    });
      
  


    beforeEach(async () => {
        await driver.get('http://frontend:5173/');
    })
    /**verifying the hamburger button and the elements displayed*/

    it('Check if the hamburger button works properly and display the menu', async function () {
        await driver.manage().setTimeouts({ implicit: 500 });
        let hamburgerButton = await driver.findElement(By.className('md:hidden'));

        await driver.wait(until.elementIsVisible(hamburgerButton));
        await hamburgerButton.click();

        let result =  await driver.findElement(By.id("menu-nab-bar-mobile")).isDisplayed();

        assert.equal(result, true)
    });


    it('Check the quiz and return a list of questions available per page.', async function () {
        await driver.manage().setTimeouts({ implicit: 500 });

        await driver.manage().setTimeouts({ implicit: 500 });
        let hamburgerButton = await driver.findElement(By.className('md:hidden'));

        await driver.wait(until.elementIsVisible(hamburgerButton));
        await hamburgerButton.click();


        let element = await driver.findElement(By.id("menu-nab-bar-mobile"))

        let elements = await element.findElements(By.id("nav-bar-options"));

       


    console.log("number of menu options ", elements.length)

    
    for(let e of elements) {
        
      console.log(await e.getText());
     
      } 
       
    });

    after(async () => await driver.quit()); 
});

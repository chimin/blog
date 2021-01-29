import { writeFileSync } from 'fs';
import * as webdriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as chromedriver from 'chromedriver';

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

describe('test', () => {
    it('should pass', async () => {
        const driver = await new webdriver.Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://localhost:3000');
            const screenshot = await driver.takeScreenshot();
            writeFileSync('screenshot.png', Buffer.from(screenshot, 'base64'));
        } finally {
            await driver.quit();
        }
    });
});
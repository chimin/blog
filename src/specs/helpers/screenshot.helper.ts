import { mkdirSync, rmdirSync, writeFileSync } from 'fs';
import * as webdriver from 'selenium-webdriver';

const screenshotsDirectory = 'out/screenshots';

jasmine.getEnv().addReporter({
    jasmineStarted() {
        rmdirSync(screenshotsDirectory, { recursive: true });
    }
});

export async function saveScreenshot(driver: webdriver.WebDriver, name: string) {
    mkdirSync(screenshotsDirectory, { recursive: true });
    const screenshot = await driver.takeScreenshot();
    writeFileSync(`${screenshotsDirectory}/${name}.png`, Buffer.from(screenshot, 'base64'));
}
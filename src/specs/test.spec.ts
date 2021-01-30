import { saveScreenshot } from './helpers/screenshot.helper';
import { startDriver } from './helpers/webdriver.helper';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('test', () => {
    const urls = [
        '/',
        '/posts/first-post',
        '/posts/second-post'
    ];

    for (const url of urls) {
        it(`should load ${url}`, async () => {
            const driver = await startDriver();
            await driver.get(`http://localhost:3000${url}`);
            await saveScreenshot(driver, url.replace(/\//g, '_'));
        });
    }
});

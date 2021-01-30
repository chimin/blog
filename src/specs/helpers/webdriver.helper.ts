import * as webdriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as chromedriver from 'chromedriver';

const disposeActions = [];

jasmine.getEnv().addReporter({
    jasmineStarted() {
        chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
    },

    async specDone() {
        for (const action of disposeActions) {
            await action();
        }
        disposeActions.splice(0);
    }
});

export async function startDriver() {
    const driver = await new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options()
            .headless()
            .windowSize({ width: 1920, height: 1080 }))
        .build();
    disposeActions.push(() => driver.quit());
    return driver;
}

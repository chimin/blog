const appConfig = require('./src/data/appConfig.json');

module.exports = {
    siteUrl: appConfig.siteUrl,
    generateRobotsTxt: true,
    autoLastmod: false
}
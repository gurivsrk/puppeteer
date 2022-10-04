const puppeteer = require('puppeteer-extra')
const $ = require('cheerio').default;
const rp = require('request-promise');



// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

const singlePage = (url)=>{

    puppeteer.launch({ headless: false })
    .then(browser => {
        return browser.newPage();
    })
    .then(page =>{
          return  page.goto(url).then(() => {
                return page.content();
            });
    })
    .then(html =>{
        return $('#fulladdress .lng_add', html).text();
    })

}

module.exports = singlePage
// const puppeteer = require('puppeteer');

const puppeteer = require('puppeteer-extra')
const $ = require('cheerio').default;
const singlePage = require('./page')

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

// //screenshot 
// puppeteer.launch({ headless: true }).then(async browser => {
//   const page = await browser.newPage();
//   await page.goto('https://www.olx.in/');
//   await page.screenshot({path: 'screenshot/screenshot.png'});

//   await browser.close();
// });

//const url = 'https://vsrkcapital.com'
const url = 'https://www.justdial.com/Delhi/Scrap-Dealers/nct-10423452'

puppeteer.launch({ headless: false })
.then(browser => {
  setTimeout(() => {
    browser.close()
  }, 50000);
  return browser.newPage();
})
.then(page => {
  return page.goto(url, {waitUntil: 'load', timeout: 0}).then( async ()=>{
   console.log($('.rsl li h2 a', await page.content()).length)
    $('.rsl li h2 a', await page.content()).each(function() {
        page.click('.rsl li h2 a',()=>{
          
        })
      })

   return page.content();
  });
})
.then(html => {
  // $('.rsl li h2 a span', html).each(function() {
  //   console.log($(this).text());
  // });
  const $url = [] 
  $('.rsl li h2 a', html).each(function() {
    $url.push($(this).attr('href'))
  });

  $url.map((link) => {
      //console.log(singlePage(link))
  })
})
.catch((err) =>{
  console.log(err)
})

// // create a PDF
// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://vsrkcapital.com', {
//       waitUntil: 'networkidle2',
//     });
//     await page.pdf({path: 'pdf/hn.pdf', format: 'a4'});
  
//     await browser.close();
//   })();

process.setMaxListeners(0)
// This code allows to get all the authors and titles of the programming books in Amazon store
//     To run this code, type 'npm run install' and then 'node index.js'
//     Luck!!!
'use strict';
const puppeteer = require('puppeteer');

( async () => {

    const browser = await puppeteer.launch( { headless: false }); // Lunch a new browser, headless: open the real browser
    const page = await browser.newPage(); // Open a new browser page
    await page.goto('https://www.amazon.com'); // Go to the page
    await page.screenshot({ path: 'amazon1.jpg' }); // Take a photo of the current page
    
    await page.type('#twotabsearchtextbox', 'programming books'); // use the search bar and type 'programming books'
    await page.screenshot({ path: 'amazon2.jpg' }); // Take a photo of the current page

    await page.click('#nav-search-submit-button'); // Click on search button

    await page.waitForSelector('.sg-col-inner'); // The browser waits the selected selector
    await page.waitForTimeout(3000); // The browser waits three seconds

    await page.screenshot({ path: 'amazon3.jpg' }); // Take a photo of the current page

    const enlaces = await page.evaluate( () => { // Evalue allow us to use the DOM
        const elements = document.querySelectorAll('.sg-col-inner h2 a');
        const links = [];

        for(let element of elements){
            links.push(element.href);
        }

        return links;
    });

    const books = [];
    for(let enlace of enlaces){
        await page.goto(enlace);
        await page.waitForSelector('#productTitle');

        const book = await page.evaluate( () => {

            const tmp = {};
            tmp.title = document.querySelector('#productTitle').innerText;
            tmp.author = document.querySelector('.author a').innerText;;
            return tmp;
        });

        books.push(book);
    }

    console.log(books);
    
    await browser.close(); // Close the browser 
})();
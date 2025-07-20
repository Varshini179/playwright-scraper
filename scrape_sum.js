const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 34 + i);
const baseUrl = "https://intense-taiga-77142.herokuapp.com/seed/";

(async () => {
    let totalSum = 0;
    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (let seed of seeds) {
        await page.goto(baseUrl + seed);
        const tableValues = await page.$$eval("table td", tds =>
            tds.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
        );
        totalSum += tableValues.reduce((acc, val) => acc + val, 0);
    }

    console.log("✅ Total sum of all numbers:", totalSum);
    await browser.close();
})();

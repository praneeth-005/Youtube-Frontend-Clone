const { chromium } = require('playwright');
const path = require('path');

const ARTIFACTS_DIR = "C:\\Users\\Praneeth\\.gemini\\antigravity\\brain\\732c73c1-4d96-43eb-9462-edb72e87850a\\artifacts";

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log("Navigating to Home Page...");
    await page.goto('http://localhost:1234');
    
    await page.waitForTimeout(2000); 
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'day1_architecture.png') });
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'day3_data_fetching.png') });
    
    console.log("Toggling sidebar...");
    const hamburger = await page.locator('img[alt="menu"]');
    if (await hamburger.count() > 0) {
        await hamburger.click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'day2_redux_sidebar.png') });
    } else {
        await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'day2_redux_sidebar.png') });
    }

    console.log("Capturing Shimmer UI...");
    const shimmerPage = await context.newPage();
    await shimmerPage.route('**/*', async (route) => {
        if (route.request().url().includes('youtube.googleapis.com')) {
            return;
        }
        route.continue();
    });
    await shimmerPage.goto('http://localhost:1234');
    await shimmerPage.waitForTimeout(1000);
    await shimmerPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'day4_shimmer.png') });

    console.log("Capturing Video Card & Dynamic Routing...");
    await page.goto('http://localhost:1234');
    await page.waitForTimeout(2000);
    const videoCard = await page.locator('img.rounded-xl').first();
    
    if (await videoCard.count() > 0) {
        // take a screenshot of the video card component by getting its parent
        const parent = await videoCard.locator('..').first();
        await parent.screenshot({ path: path.join(ARTIFACTS_DIR, 'day6_component.png') });
        await videoCard.click();
        await page.waitForTimeout(3000); 
        await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'day5_dynamic_routing.png') });
    } else {
        console.log("No video card found!");
    }

    await browser.close();
    console.log("Screenshots completed.");
})();

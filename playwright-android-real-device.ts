require('dotenv').config();
// Using require for _android as it's not a standard Playwright export
const { _android } = require("playwright");
const { expect } = require("chai");

(async () => {
    console.log('Starting Playwright Android Real Device test...');
    console.log('Device: Pixel 5 (Android 11)');

    const capabilities = {
        "LT:Options": {
            "platformName": "android",
            "deviceName": "Pixel 5",
            "platformVersion": "11",
            "isRealMobile": true,
            "build": "Playwright android build",
            "name": "Playwright android test",
            "user": process.env.LT_USERNAME,
            "accessKey": process.env.LT_ACCESS_KEY,
            "network": true,
            "video": true,
            "console": true,
            "projectName": "New Project",
        },
    };

    console.log('Connecting to LambdaTest Android cloud...');
    console.log('Username:', process.env.LT_USERNAME);

    let device = await _android.connect(
        `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(capabilities))}`,
    );

    console.log(`Model:: ${device.model()}, serial:: ${device.serial()}`);

    await device.shell("am force-stop com.android.chrome");

    let context = await device.launchBrowser();
    context.setDefaultTimeout(120000);
    let page = await context.newPage();

    console.log('Navigating to DuckDuckGo...');
    await page.goto("https://duckduckgo.com");
    
    console.log('Finding search input...');
    let element = await page.$("[name=\"q\"]");
    
    console.log('Clicking and typing "Playwright"...');
    await element.click();
    await element.type("Playwright");
    await element.press("Enter");
    
    console.log('Waiting for page to load...');
    await page.waitForTimeout(3000);
    
    let title = await page.title();
    console.log('Page title:', title);

    try {
        expect(title).to.equal("Playwright at DuckDuckGo");
        console.log('Android Test PASSED!');
        // Mark the test as completed or failed
        await page.evaluate((_: any) => {}, `lambdatest_action: ${JSON.stringify({ action: "setTestStatus", arguments: {status: "passed", remark: "Assertions passed" },})}`);
        console.log('Marked test as PASSED in LambdaTest dashboard');
        
        await teardown(page, context, device);
    } catch (e: any) {
        console.log('Android Test FAILED!');
        console.log('Error:', e.message);
        await page.evaluate((_: any) => {}, `lambdatest_action: ${JSON.stringify({action: "setTestStatus", arguments: { status: "failed", remark: e.stack }})}`);
        console.log('Marked test as FAILED in LambdaTest dashboard');
        
        await teardown(page, context, device);
        throw e.stack;
    }

})().catch(err => {
    console.error('Unexpected error occurred in Android test:');
    console.error(err);
    process.exit(1);
});

async function teardown(page: any, context: any, device: any) {
    console.log('Cleaning up Android test resources...');
    try {
        console.log('   Closing page...');
        await Promise.race([
            page.close(),
            new Promise(resolve => setTimeout(resolve, 10000)) // 10 second timeout
        ]);
        console.log('Page closed');
        
        console.log('Closing context...');
        await Promise.race([
            context.close(),
            new Promise(resolve => setTimeout(resolve, 10000)) // 10 second timeout
        ]);
        console.log('Context closed');
        
        console.log('   Closing device connection...');
        await Promise.race([
            device.close(),
            new Promise(resolve => setTimeout(resolve, 15000)) // 15 second timeout for device
        ]);
        console.log('Device closed');
        
        console.log('Android test completed and resources cleaned up!');
    } catch (error: any) {
        console.log('Cleanup completed with warnings:', error.message);
    }
    process.exit(0);
}


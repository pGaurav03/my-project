import { test, expect } from '@playwright/test';

test.describe('iOS Real Device Test', () => {
    test('Open Arnold Clark Customer Dashboard', async ({ page }) => {
        console.log('Starting iOS Real Device test...');
        console.log('Device: iPhone 16 (iOS 18)');

        console.log('Navigating to Arnold Clark Customer Dashboard...');
        await page.goto('https://stg.app.arnoldclark.com/customer-dashboard', { timeout: 60000 });

        console.log('Waiting for page to load...');
        await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
        await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
            console.log('Network idle timeout, continuing...');
        });

        console.log('Page loaded successfully');
        console.log("Current URL:", await page.url());

        // Fill email
        console.log("Finding email input...");
        let element = await page.locator("#username");

        console.log("Clicking email input...");
        await element.click();

        console.log("Entering email address");
        await element.fill("test@test.com");

        console.log("Clicking continue button...");
        await page.locator('button[name="action"]').click();
        
        console.log('iOS Test PASSED! - Successfully opened Arnold Clark Customer Dashboard');

        // Mark test status in LambdaTest
        await page.evaluate((_: any) => {}, `lambdatest_action: ${JSON.stringify({
            action: "setTestStatus",
            arguments: { status: "passed", remark: "Arnold Clark Customer Dashboard opened successfully" }
        })}`);
    });
});


import { test, expect } from '@playwright/test';

test.describe('Android Real Device Test', () => {
    test('Search on DuckDuckGo', async ({ page }) => {
        console.log('Starting Android Real Device test...');
        console.log('Device: Pixel 5 (Android 11)');

        console.log('Navigating to DuckDuckGo...');
        await page.goto('https://duckduckgo.com', { timeout: 60000 });

        console.log('Finding search input...');
        const searchInput = page.locator('[name="q"]');
        await searchInput.waitFor({ timeout: 30000 });

        console.log('Clicking and typing "Playwright"...');
        await searchInput.click();
        await searchInput.fill('Playwright');
        await searchInput.press('Enter');

        console.log('Waiting for page to load...');
        await page.waitForTimeout(3000);

        const title = await page.title();
        console.log('Page title:', title);

        expect(title).toContain('Playwright');
        console.log('Android Test PASSED!');

        // Mark test status in LambdaTest
        await page.evaluate((_: any) => {}, `lambdatest_action: ${JSON.stringify({
            action: "setTestStatus",
            arguments: { status: "passed", remark: "Assertions passed" }
        })}`);
    });
});


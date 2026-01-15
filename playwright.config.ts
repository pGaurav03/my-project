import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
    testDir: './tests',

    projects: [
        // Existing — Windows
        {
            name: 'Chrome-LambdaTest-Windows',
            use: {
                connectOptions: {
                    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                        JSON.stringify({
                            browserName: 'chrome',
                            browserVersion: 'latest',
                            'LT:Options': {
                                user: process.env.LT_USERNAME,
                                accessKey: process.env.LT_ACCESS_KEY,
                                platform: 'Windows 10',
                                build: 'Playwright AdManager Tests',
                                name: 'AdManager Test Suite',
                                playwrightVersion: '1.53.2',
                            },
                        })
                    )}`,
                },
            },
        },

        // Existing — macOS
        {
            name: 'Chrome-LambdaTest-macOS',
            use: {
                connectOptions: {
                    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                        JSON.stringify({
                            browserName: 'chrome',
                            browserVersion: 'latest',
                            'LT:Options': {
                                user: process.env.LT_USERNAME,
                                accessKey: process.env.LT_ACCESS_KEY,
                                platform: 'macOS Monterey',
                                build: 'Playwright AdManager Tests',
                                name: 'AdManager Test Suite',
                                playwrightVersion: '1.53.2',
                            },
                        })
                    )}`,
                },
            },
        },

        // ✅ Android Real Device
        {
            name: 'Android-Real-Device',
            use: {
                connectOptions: {
                    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                        JSON.stringify({
                            "LT:Options": {
                                platformName: "android",
                                deviceName: "Pixel 5",
                                platformVersion: "11",
                                isRealMobile: true,
                                build: "Playwright Android Tests",
                                name: "Android Real Device Test",
                                user: process.env.LT_USERNAME,
                                accessKey: process.env.LT_ACCESS_KEY,
                                network: true,
                                video: true,
                                console: true,
                                projectName: "New Project",
                                playwrightVersion: "1.53.2",
                            }
                        })
                    )}`
                }
            }
        },

        // ✅ iOS Real Device (Safari)
        {
            name: 'iOS-Real-Device',
            use: {
                connectOptions: {
                    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                        JSON.stringify({
                            "LT:Options": {
                                platformName: "ios",
                                deviceName: "iPhone 16",
                                platformVersion: "18",
                                isRealMobile: true,
                                build: "Playwright iOS Tests",
                                name: "iOS Real Device Test",
                                user: process.env.LT_USERNAME,
                                accessKey: process.env.LT_ACCESS_KEY,
                                network: true,
                                video: true,
                                console: true,
                                projectName: "New Project",
                                playwrightVersion: "1.53.2",
                            }
                        })
                    )}`,
                    timeout: 60000,
                }
            }
        },
    ],
});


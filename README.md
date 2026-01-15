# Playwright TypeScript - LambdaTest Real Device Testing

This project contains TypeScript sample tests for running Playwright tests on LambdaTest's real Android and iOS devices.

## Prerequisites

1. **Node.js** (v14 or higher)
2. **LambdaTest Account** - Sign up at [LambdaTest](https://www.lambdatest.com/)
3. **LambdaTest Credentials** - Get your username and access key from the [Automation Dashboard](https://automation.lambdatest.com/)

## Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   Copy the example environment file and add your LambdaTest credentials:

   ```bash
   cp env.example .env
   ```

   Edit `.env` and add your credentials:

   ```env
   LT_USERNAME=your_lambdatest_username
   LT_ACCESS_KEY=your_lambdatest_access_key
   ```

   > **Note:** You can find your credentials by clicking the "Access Key" button at the top-right of the [LambdaTest Automation Dashboard](https://automation.lambdatest.com/).

   Alternatively, you can set environment variables directly:

   **macOS/Linux:**
   ```bash
   export LT_USERNAME="YOUR_LAMBDATEST_USERNAME"
   export LT_ACCESS_KEY="YOUR_LAMBDATEST_ACCESS_KEY"
   ```

   **Windows:**
   ```bash
   set LT_USERNAME="YOUR_LAMBDATEST_USERNAME"
   set LT_ACCESS_KEY="YOUR_LAMBDATEST_ACCESS_KEY"
   ```

## Running Tests

### Using LambdaTest Playwright SDK (Recommended)

The project now supports running tests using the **LambdaTest Playwright SDK**, which provides a configuration-driven approach without requiring code modifications.

#### Setup SDK Configuration

1. **Configure credentials in `lambdatest.yml`**:
   - Open `lambdatest.yml` and replace `{YOUR_LAMBDATEST_USERNAME}` and `{YOUR_LAMBDATEST_ACCESS_KEY}` with your actual credentials
   - OR ensure your `.env` file has `LT_USERNAME` and `LT_ACCESS_KEY` set, then run:
     ```bash
     npm run setup:sdk
     ```
     This will automatically inject your credentials from `.env` into `lambdatest.yml`

#### Run iOS Real Device Tests with SDK

Run the iOS test on a real device using the SDK:

```bash
npm run test:sdk:ios
```

This will:
- Automatically inject credentials from `.env` into `lambdatest.yml`
- Execute the iOS real device test on LambdaTest cloud
- Use the configuration defined in `lambdatest.yml`

#### Run All Tests with SDK

```bash
npm run test:sdk:all
```

#### SDK Configuration

The SDK configuration is managed in `lambdatest.yml`. Key settings for iOS real device:

- **Platform**: iOS
- **Device**: iPhone 16 (configurable)
- **iOS Version**: 18 (configurable)
- **Browser**: WebKit (Safari)
- **Real Device**: Enabled

You can customize these settings in the `platforms` section of `lambdatest.yml`.

For more details, see the [LambdaTest Playwright SDK Documentation](https://www.lambdatest.com/support/docs/playwright-sdk/).

### Using Direct Playwright Configuration (Legacy)

#### Android Real Device Test

Run the Android test on a real device (Pixel 5, Android 11):

```bash
npm run test:android
```

Or using ts-node directly:

```bash
ts-node playwright-android-real-device.ts
```

#### iOS Real Device Test

Run the iOS test on a real device (iPhone 16, iOS 18):

```bash
npm run test:ios
```

Or using ts-node directly:

```bash
ts-node playwright-ios-real-device.ts
```

### Compile TypeScript First

If you prefer to compile TypeScript to JavaScript first:

```bash
# Compile TypeScript
npm run build

# Run compiled JavaScript
npm run test:android:compiled
npm run test:ios:compiled
```

## Test Files

- **`playwright-android-real-device.ts`** - Android real device test that searches on DuckDuckGo
- **`playwright-ios-real-device.ts`** - iOS real device test that searches on Wikipedia

## Playwright Version Support

You can run tests using Playwright versions **1.20.0** to **1.53.2**.

This project uses Playwright version **1.53.2**.

## View Test Results

After running your tests, you can view the results on the [LambdaTest Automation Dashboard](https://automation.lambdatest.com/):

1. Navigate to the Automation Dashboard
2. Select your build from the left panel
3. Click on the session name to view detailed test execution information including:
   - Test Name & ID
   - Selected configurations
   - Test logs
   - Test session video
   - Console logs

## Configuration

### Android Capabilities

The Android test uses the following default configuration:

- **Platform:** Android
- **Device:** Pixel 5
- **Platform Version:** 11
- **Browser:** Chrome

You can modify these in `playwright-android-real-device.ts`:

```typescript
const capabilities = {
    "LT:Options": {
        "platformName": "android",
        "deviceName": "Pixel 5",
        "platformVersion": "11",
        // ... other options
    },
};
```

### iOS Capabilities

The iOS test uses the following default configuration:

- **Platform:** iOS
- **Device:** iPhone 16
- **Platform Version:** 18
- **Browser:** Safari

You can modify these in `playwright-ios-real-device.ts`:

```typescript
const capabilities = {
    "LT:Options": {
        "platformName": "ios",
        "deviceName": "iPhone 16",
        "platformVersion": "18",
        // ... other options
    },
};
```

## Important Notes

### Android Testing

- The timeout value specified in Playwright configuration is not honored during mobile browser automation tests on real devices, defaulting to 30 seconds. The test sets `context.setDefaultTimeout(120000)` to work around this.

### iOS Testing

- **Beta Release:** Playwright support for real iOS devices is currently under beta.
- Only Safari and Node.js integrations are currently supported.
- Playwright testing on real iOS devices is supported on iOS 17, iOS 18, and iOS 26 across both iPhones and iPads.

## Documentation

- [LambdaTest Playwright SDK Documentation](https://www.lambdatest.com/support/docs/playwright-sdk/)
- [LambdaTest Playwright Android Documentation](https://www.lambdatest.com/support/docs/playwright-android/)
- [LambdaTest Playwright iOS Documentation](https://www.lambdatest.com/support/docs/playwright-ios-device/)

## Troubleshooting

1. **Connection Issues**: Ensure your LambdaTest credentials are correct and set in the environment variables.

2. **Timeout Issues**: Increase the timeout values in the test files if tests are timing out.

3. **Device Availability**: Some devices may not be available at all times. Try different device configurations if needed.

## License

ISC



# How to Share This Project

This guide explains how to share this Playwright iOS real device testing project with others.

## 📦 What to Share

### Option 1: Share via Git Repository (Recommended)

1. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

2. **Add all files** (`.gitignore` will automatically exclude sensitive files):
   ```bash
   git add .
   git commit -m "Initial commit: Playwright iOS real device testing with LambdaTest SDK"
   ```

3. **Push to a repository**:
   - Create a repository on GitHub, GitLab, or Bitbucket
   - Push your code:
     ```bash
     git remote add origin <your-repository-url>
     git push -u origin main
     ```

### Option 2: Share as ZIP Archive

1. **Create a clean archive** (excludes node_modules, .env, logs, etc.):
   ```bash
   # On macOS/Linux
   zip -r playwright-ios-project.zip . -x "node_modules/*" ".env" "*.log" "test-results/*" "log/*" ".DS_Store"
   
   # Or use tar
   tar -czf playwright-ios-project.tar.gz --exclude="node_modules" --exclude=".env" --exclude="*.log" --exclude="test-results" --exclude="log" .
   ```

## 🔒 Important: Files NOT to Share

The following files contain sensitive information and are automatically excluded by `.gitignore`:

- ✅ **`.env`** - Contains your LambdaTest credentials (NEVER share this!)
- ✅ **`node_modules/`** - Dependencies (can be reinstalled)
- ✅ **`test-results/`** - Test execution results
- ✅ **`log/`** - Log files
- ✅ **`.DS_Store`** - macOS system files

## 📋 Setup Instructions for Recipients

When someone receives this project, they should:

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Credentials

**Option A: Using .env file (Recommended)**
```bash
# Copy the example file
cp env.example .env

# Edit .env and add their LambdaTest credentials
# LT_USERNAME=their_username
# LT_ACCESS_KEY=their_access_key
```

**Option B: Manual Configuration**
- Edit `lambdatest.yml`
- Replace `{YOUR_LAMBDATEST_USERNAME}` with their username
- Replace `{YOUR_LAMBDATEST_ACCESS_KEY}` with their access key

### 3. Run the Test
```bash
npm run test:sdk:ios
```

## 📝 What's Included in This Project

- ✅ **LambdaTest Playwright SDK** configuration (`lambdatest.yml`)
- ✅ **iOS real device test** (`tests/ios-real-device.spec.ts`)
- ✅ **Setup script** for automatic credential injection (`setup-lambdatest-config.js`)
- ✅ **Package.json** with all necessary scripts
- ✅ **README.md** with complete documentation
- ✅ **TypeScript configuration** (`tsconfig.json`)
- ✅ **Example environment file** (`env.example`)

## 🚀 Quick Start for New Users

```bash
# 1. Clone or download the project
git clone <repository-url>
cd "Playwright TS"

# 2. Install dependencies
npm install

# 3. Set up credentials
cp env.example .env
# Edit .env with their credentials

# 4. Run the test
npm run test:sdk:ios
```

## 📚 Additional Resources

- [LambdaTest Playwright SDK Documentation](https://www.lambdatest.com/support/docs/playwright-sdk/)
- [LambdaTest Playwright iOS Documentation](https://www.lambdatest.com/support/docs/playwright-ios-device/)
- [Get LambdaTest Credentials](https://accounts.lambdatest.com/security/username-accesskey)

## ⚠️ Security Reminders

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Never share credentials** in code, issues, or pull requests
3. **Use environment variables** for CI/CD pipelines
4. **Rotate credentials** if accidentally exposed

## 🔄 Updating the Shared Project

If you make changes and want to share updates:

```bash
# Commit your changes
git add .
git commit -m "Description of changes"
git push
```

Recipients can update by:
```bash
git pull
npm install  # If dependencies changed
```


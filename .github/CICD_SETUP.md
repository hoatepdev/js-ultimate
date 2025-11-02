# CI/CD Pipeline Setup Guide

This document explains the CI/CD workflows configured for the js-ultimate library.

## Overview

The project uses **GitHub Actions** for continuous integration and deployment with the following workflows:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **CI** | Push, PR | Run tests across Node versions |
| **Release** | Git tags | Publish to npm and create GitHub releases |
| **Bundle Size Check** | PRs to main | Track bundle size changes |
| **CodeQL** | Push, Schedule | Security scanning |
| **Dependabot** | Weekly | Dependency updates |

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Triggers**: Push to `main`/`develop`, Pull Requests

**Jobs**:

#### Test Job
- **Matrix Strategy**: Tests on Node.js 18, 20, 22
- **Steps**:
  1. Checkout code
  2. Setup Node.js with yarn cache
  3. Install dependencies (frozen lockfile)
  4. Run format check (`yarn format:check`)
  5. Build project (`yarn build`)
  6. Run tests (`yarn test --run`)
  7. TypeScript type checking (`yarn tsc --noEmit`)

#### Build Job
- Verifies build artifacts are generated
- Uploads build artifacts for inspection
- Ensures dist files exist

#### Security Job
- Runs `yarn audit` on runtime dependencies
- Tests prototype pollution prevention
- Fails if security vulnerabilities found

**Status Badges**: Add to README.md
```markdown
[![CI](https://github.com/hoatepdev/js-ultimate/actions/workflows/ci.yml/badge.svg)](https://github.com/hoatepdev/js-ultimate/actions/workflows/ci.yml)
```

### 2. Release Workflow (`.github/workflows/release.yml`)

**Triggers**: Git tags matching `v*` pattern (e.g., `v2.0.2`)

**Requirements**:
- `NPM_TOKEN` secret must be configured in repository settings

**Steps**:
1. Runs full test suite
2. Builds the project
3. Verifies package.json version matches git tag
4. Creates GitHub Release with auto-generated notes
5. Publishes to npm with provenance

**How to Release**:

```bash
# 1. Update version in package.json
npm version patch  # or minor, major

# 2. Push the tag (this triggers the workflow)
git push origin main --tags

# 3. The workflow will:
#    - Run all tests
#    - Build the package
#    - Create GitHub release
#    - Publish to npm
```

### 3. Bundle Size Check (`.github/workflows/size-check.yml`)

**Triggers**: Pull Requests to `main`

**Features**:
- Compares PR bundle size with base branch
- Posts comment on PR with size comparison
- Shows changes for: `index.js`, `index.cjs`, `index.mjs` (gzipped)
- Fails if bundle increases by more than 500 bytes

**Example Comment**:
```
## Bundle Size Report

| File | Base | PR | Change |
|------|------|-----|---------|
| index.js (gzip) | 330 B | 335 B | 🟡 +5 B |
| index.cjs (gzip) | 481 B | 481 B | ⚪ ±0 B |
| index.mjs (gzip) | 320 B | 318 B | 🟢 -2 B |
```

### 4. CodeQL Security Scanning (`.github/workflows/codeql.yml`)

**Triggers**:
- Push to `main`
- Pull requests to `main`
- Weekly schedule (Mondays)

**Purpose**:
- Automated security vulnerability scanning
- Detects common security issues
- Integrates with GitHub Security tab

### 5. Dependabot (`.github/dependabot.yml`)

**Schedule**: Weekly (Mondays)

**Configuration**:
- Groups dev dependencies together
- Limits to 10 open PRs
- Auto-assigns to `hoatepdev`
- Ignores TypeScript major version updates
- Also updates GitHub Actions

## Setup Instructions

### Required GitHub Secrets

Configure these in: `Settings > Secrets and variables > Actions`

| Secret | Description | How to Get |
|--------|-------------|------------|
| `NPM_TOKEN` | npm authentication token | https://www.npmjs.com/settings/[username]/tokens |
| `GITHUB_TOKEN` | Automatically provided | No action needed |

#### Creating an NPM Token

1. Go to https://www.npmjs.com/settings/[your-username]/tokens
2. Click "Generate New Token" > "Classic Token"
3. Select "Automation" type
4. Copy the token
5. Add to GitHub: `Settings > Secrets > New repository secret`
   - Name: `NPM_TOKEN`
   - Value: [paste token]

### Enable GitHub Actions

1. Go to repository `Settings > Actions > General`
2. Enable "Allow all actions and reusable workflows"
3. Under "Workflow permissions":
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests

### Enable Dependabot

Dependabot should be enabled automatically with the config file.

Verify in: `Settings > Security > Dependabot`

## Branch Protection Rules

Recommended settings for `main` branch:

Go to: `Settings > Branches > Add rule`

**Branch name pattern**: `main`

**Protection rules**:
- ✅ Require a pull request before merging
  - Require approvals: 1
- ✅ Require status checks to pass before merging
  - Required checks:
    - `Test (Node 18)`
    - `Test (Node 20)`
    - `Test (Node 22)`
    - `Build Check`
    - `Security Audit`
- ✅ Require conversation resolution before merging
- ✅ Do not allow bypassing the above settings

## Testing the CI Pipeline Locally

### Test CI Workflow

```bash
# Install dependencies
yarn install

# Run format check
yarn format:check

# Build
yarn build

# Run tests
yarn test --run

# Type check
yarn tsc --noEmit
```

### Test Bundle Size

```bash
# Build and check sizes
yarn build
gzip -c dist/index.js | wc -c
gzip -c dist/cjs/index.cjs | wc -c
gzip -c dist/esm/index.mjs | wc -c
```

### Test Security

```bash
# Audit dependencies
yarn audit

# Test prototype pollution prevention
node -e "
  const { merge } = require('./dist/object.js');
  const malicious = JSON.parse('{\"__proto__\": {\"polluted\": \"yes\"}}');
  merge({}, malicious);
  if (({}).polluted) {
    console.error('FAIL: Prototype pollution detected');
    process.exit(1);
  }
  console.log('PASS: Prototype pollution prevented');
"
```

## Release Process

### Semantic Versioning

Follow [SemVer](https://semver.org/):

- **Patch** (2.0.x): Bug fixes, security patches
- **Minor** (2.x.0): New features, backward compatible
- **Major** (x.0.0): Breaking changes

### Step-by-Step Release

1. **Update Code**
   ```bash
   # Make your changes
   git checkout -b feature/my-feature
   # ... make changes ...
   git commit -m "feat: add new feature"
   git push origin feature/my-feature
   ```

2. **Create PR**
   - Open PR to `main`
   - Wait for CI to pass
   - Get approval
   - Merge

3. **Create Release**
   ```bash
   # Pull latest main
   git checkout main
   git pull origin main

   # Update version (auto-updates package.json and creates tag)
   npm version patch -m "Release v%s"

   # Push changes and tag
   git push origin main --follow-tags
   ```

4. **Automated Release**
   - GitHub Actions will automatically:
     - Run tests
     - Build package
     - Create GitHub Release
     - Publish to npm

5. **Verify Release**
   - Check GitHub: https://github.com/hoatepdev/js-ultimate/releases
   - Check npm: https://www.npmjs.com/package/js-ultimate
   - Test install: `npm install js-ultimate@latest`

## Monitoring

### GitHub Actions Dashboard

View all workflow runs: https://github.com/hoatepdev/js-ultimate/actions

### Email Notifications

Configure in: `Settings > Notifications`
- Get notified on workflow failures
- Get notified on Dependabot security alerts

### Status Checks

Add badges to README.md:

```markdown
[![CI](https://github.com/hoatepdev/js-ultimate/actions/workflows/ci.yml/badge.svg)](https://github.com/hoatepdev/js-ultimate/actions/workflows/ci.yml)
[![CodeQL](https://github.com/hoatepdev/js-ultimate/actions/workflows/codeql.yml/badge.svg)](https://github.com/hoatepdev/js-ultimate/actions/workflows/codeql.yml)
[![npm version](https://img.shields.io/npm/v/js-ultimate.svg)](https://www.npmjs.com/package/js-ultimate)
[![License](https://img.shields.io/npm/l/js-ultimate.svg)](https://github.com/hoatepdev/js-ultimate/blob/main/LICENSE.md)
```

## Troubleshooting

### Release Workflow Fails

**Problem**: "Version mismatch" error

**Solution**: Ensure package.json version matches the git tag
```bash
# If tag is v2.0.2, package.json must have "version": "2.0.2"
```

### NPM Publish Fails

**Problem**: "authentication failed"

**Solution**: Regenerate NPM_TOKEN and update GitHub secret

### Tests Fail on Specific Node Version

**Problem**: Tests pass locally but fail on Node 18

**Solution**: Test locally with that Node version
```bash
nvm use 18  # or use docker
yarn test
```

### Bundle Size Check Fails

**Problem**: PR increases bundle size too much

**Solution**:
1. Review what changed
2. Optimize if possible
3. If increase is justified, update threshold in workflow

## Best Practices

1. **Always run tests locally** before pushing
2. **Keep PRs small** - easier to review and less likely to break CI
3. **Write meaningful commit messages** - they appear in release notes
4. **Monitor workflow runs** - fix failures quickly
5. **Update dependencies regularly** - review Dependabot PRs weekly
6. **Security first** - never skip security checks

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

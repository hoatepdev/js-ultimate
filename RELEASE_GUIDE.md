# 🚀 Release Guide for js-ultimate

This guide explains how to release new versions of js-ultimate to npm using the automated CI/CD pipeline.

---

## 📋 Prerequisites

### **1. First-Time Setup (Only Once)**

#### Configure NPM Token

You need to create an npm automation token and add it to GitHub:

```bash
# 1. Login to npm
npm login

# 2. Go to npm tokens page
open https://www.npmjs.com/settings/YOUR_USERNAME/tokens

# 3. Click "Generate New Token" → "Automation"
# 4. Copy the token (it starts with npm_...)
```

Then add to GitHub:
1. Go to: https://github.com/hoatepdev/js-ultimate/settings/secrets/actions
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: [paste your npm token]
5. Click "Add secret"

#### Verify npm Package Access

```bash
# Make sure you have publish rights
npm owner ls js-ultimate

# If package doesn't exist yet, you'll create it on first publish
```

---

## 🎯 Release Process (Automated)

### **Current Version**: `2.0.2`

The CI/CD pipeline automates everything. You just need to:

### **Step 1: Commit All Changes**

```bash
# Make sure all your changes are committed
git status

# If you have uncommitted changes:
git add .
git commit -m "feat: add awesome new feature"
```

### **Step 2: Choose Release Type**

Decide which type of release based on [Semantic Versioning](https://semver.org/):

| Type | Current → New | Use When |
|------|---------------|----------|
| **Patch** | 2.0.2 → 2.0.3 | Bug fixes, security patches |
| **Minor** | 2.0.2 → 2.1.0 | New features (backward compatible) |
| **Major** | 2.0.2 → 3.0.0 | Breaking changes |

### **Step 3: Update Version & Create Tag**

```bash
# For a PATCH release (bug fixes)
npm version patch

# For a MINOR release (new features)
npm version minor

# For a MAJOR release (breaking changes)
npm version major
```

This command will:
- ✅ Update `package.json` version
- ✅ Create a git commit
- ✅ Create a git tag (e.g., `v2.0.3`)

### **Step 4: Push to GitHub**

```bash
# Push both the commit AND the tag
git push origin main --follow-tags
```

### **Step 5: Watch the Magic Happen** ✨

The **Release Workflow** automatically:

1. ✅ Runs all 126 tests
2. ✅ Builds the package
3. ✅ Verifies version matches tag
4. ✅ Creates GitHub Release with notes
5. ✅ Publishes to npm with provenance
6. ✅ Notifies you of success

**Monitor the workflow**:
- https://github.com/hoatepdev/js-ultimate/actions

**Check the results**:
- GitHub Release: https://github.com/hoatepdev/js-ultimate/releases
- npm Package: https://www.npmjs.com/package/js-ultimate

---

## 📝 Example Release Workflow

### Example: Releasing v2.0.3 (Patch - Security Fix)

```bash
# 1. You already fixed the prototype pollution bug ✅
#    and committed the changes ✅

# 2. Pull latest changes
git checkout main
git pull origin main

# 3. Create patch release
npm version patch
# Output: v2.0.3

# 4. Push with tags
git push origin main --follow-tags

# 5. Wait ~2 minutes for CI/CD
# ✅ Tests pass
# ✅ Build succeeds
# ✅ Published to npm
# ✅ GitHub release created

# 6. Verify
npm view js-ultimate version
# Output: 2.0.3
```

### Example: Releasing v2.1.0 (Minor - New Features)

```bash
# After adding new utility functions

git add .
git commit -m "feat: add partition, mapKeys, and mapValues functions"
git push origin main

# Wait for CI to pass, then:
npm version minor  # 2.0.2 → 2.1.0
git push origin main --follow-tags

# Automatic release happens! 🎉
```

---

## 🔍 Manual Verification

After release, verify everything worked:

```bash
# Check npm
npm view js-ultimate version
npm view js-ultimate

# Test install
npm install js-ultimate@latest
# or
yarn add js-ultimate@latest

# Check in a new project
mkdir test-install && cd test-install
npm init -y
npm install js-ultimate
node -e "const { merge } = require('js-ultimate'); console.log(merge({a:1}, {b:2}))"
```

---

## 🛠️ Manual Release (Fallback)

If the automated release fails, you can publish manually:

```bash
# 1. Make sure you're on main and up to date
git checkout main
git pull origin main

# 2. Update version manually
npm version patch  # or minor, or major

# 3. Build
yarn build

# 4. Check what will be published
npm pack --dry-run

# 5. Publish to npm
npm publish --access public

# 6. Push tag to GitHub
git push origin main --follow-tags

# 7. Manually create GitHub release
# Go to: https://github.com/hoatepdev/js-ultimate/releases/new
```

---

## 📊 Release Checklist

Before releasing, ensure:

- [ ] All tests pass locally (`yarn test --run`)
- [ ] Build succeeds (`yarn build`)
- [ ] No uncommitted changes (`git status`)
- [ ] You're on the `main` branch
- [ ] You've pulled latest changes (`git pull`)
- [ ] Version bump is appropriate (patch/minor/major)
- [ ] `NPM_TOKEN` secret is configured in GitHub
- [ ] You have npm publish rights to `js-ultimate`

---

## 🚨 Troubleshooting

### Issue: "Version mismatch" error in workflow

**Cause**: Git tag doesn't match package.json version

**Fix**:
```bash
# Delete the tag
git tag -d v2.0.3
git push origin :refs/tags/v2.0.3

# Fix package.json version manually
# Then recreate tag
npm version patch --force
git push origin main --follow-tags
```

### Issue: "npm ERR! 403 Forbidden"

**Cause**: Missing or invalid `NPM_TOKEN`

**Fix**:
1. Generate new npm token: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Update GitHub secret: https://github.com/hoatepdev/js-ultimate/settings/secrets/actions
3. Re-run workflow or manually push tag again

### Issue: "Package already exists"

**Cause**: Version already published to npm

**Fix**:
```bash
# You cannot overwrite an npm version
# You must bump to a new version
npm version patch  # This will increment: 2.0.3 → 2.0.4
git push origin main --follow-tags
```

### Issue: Tests fail in CI but pass locally

**Cause**: Different Node.js version or environment

**Fix**:
```bash
# Test with different Node versions locally
nvm use 18 && yarn test
nvm use 20 && yarn test
nvm use 22 && yarn test

# Or check the CI logs for specific failures
```

---

## 📈 Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.2 | Current | Security fix (prototype pollution) |
| 2.0.1 | Previous | Bug fixes |
| 2.0.0 | Previous | Major refactor |

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Standard release flow
npm version patch && git push --follow-tags

# Check what would be published
npm pack --dry-run

# View published package info
npm view js-ultimate

# Test install latest version
npm install js-ultimate@latest

# View release workflow runs
open https://github.com/hoatepdev/js-ultimate/actions

# View npm package page
open https://www.npmjs.com/package/js-ultimate

# View GitHub releases
open https://github.com/hoatepdev/js-ultimate/releases
```

---

## 📚 Resources

- **Semantic Versioning**: https://semver.org/
- **npm Publishing**: https://docs.npmjs.com/cli/v9/commands/npm-publish
- **GitHub Releases**: https://docs.github.com/en/repositories/releasing-projects-on-github
- **Package Provenance**: https://docs.npmjs.com/generating-provenance-statements

---

## ✅ Post-Release Tasks

After a successful release:

1. **Announce the release**
   - Tweet about it
   - Post on Reddit (/r/javascript, /r/typescript)
   - Update project README if needed

2. **Update changelog**
   - GitHub auto-generates release notes
   - Optionally create/update CHANGELOG.md

3. **Monitor issues**
   - Watch for bug reports related to the new release
   - Respond to user feedback

4. **Update documentation**
   - If you added new functions, update API docs
   - Add migration guide for breaking changes

---

**Next Release**: v2.0.3 (Security patch ready to go!)

**Recommended**: Release the security fix ASAP using:
```bash
npm version patch && git push --follow-tags
```

This will publish the prototype pollution fix to npm automatically! 🚀

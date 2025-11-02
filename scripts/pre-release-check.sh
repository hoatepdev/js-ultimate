#!/bin/bash

# Pre-Release Checklist Script for js-ultimate
# Run this before releasing to npm: ./scripts/pre-release-check.sh

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  🔍 Pre-Release Checklist for js-ultimate                     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# Check 1: Git status
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  Checking git status..."
if [[ -z $(git status -s) ]]; then
  echo -e "${GREEN}✅ Working directory is clean${NC}"
else
  echo -e "${RED}❌ You have uncommitted changes:${NC}"
  git status -s
  ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 2: Current branch
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  Checking current branch..."
BRANCH=$(git branch --show-current)
if [[ "$BRANCH" == "main" ]]; then
  echo -e "${GREEN}✅ On main branch${NC}"
else
  echo -e "${YELLOW}⚠️  Currently on branch: $BRANCH${NC}"
  echo "   Consider switching to main: git checkout main"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 3: Pull latest changes
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  Checking if up to date with remote..."
git fetch origin main --quiet
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "")
if [[ "$LOCAL" == "$REMOTE" ]]; then
  echo -e "${GREEN}✅ Up to date with origin/main${NC}"
elif [[ -z "$REMOTE" ]]; then
  echo -e "${YELLOW}⚠️  No upstream branch set${NC}"
else
  echo -e "${RED}❌ Not up to date with origin/main${NC}"
  echo "   Run: git pull origin main"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 4: Dependencies installed
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣  Checking dependencies..."
if [[ -d "node_modules" ]]; then
  echo -e "${GREEN}✅ Dependencies installed${NC}"
else
  echo -e "${RED}❌ Dependencies not installed${NC}"
  echo "   Run: yarn install"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 5: Build
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣  Running build..."
if yarn build --silent 2>&1 > /dev/null; then
  echo -e "${GREEN}✅ Build successful${NC}"
else
  echo -e "${RED}❌ Build failed${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 6: Tests
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6️⃣  Running tests..."
if yarn test --run --silent 2>&1 > /dev/null; then
  echo -e "${GREEN}✅ All tests passed${NC}"
else
  echo -e "${RED}❌ Tests failed${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 7: Format check
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "7️⃣  Checking code formatting..."
if yarn format:check --silent 2>&1 > /dev/null; then
  echo -e "${GREEN}✅ Code is properly formatted${NC}"
else
  echo -e "${YELLOW}⚠️  Code needs formatting${NC}"
  echo "   Run: yarn format"
fi
echo ""

# Check 8: TypeScript check
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "8️⃣  Checking TypeScript types..."
if yarn tsc --noEmit --silent 2>&1 > /dev/null; then
  echo -e "${GREEN}✅ No TypeScript errors${NC}"
else
  echo -e "${RED}❌ TypeScript errors found${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 9: Dist files
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "9️⃣  Checking dist files..."
if [[ -f "dist/index.js" && -f "dist/index.d.ts" ]]; then
  echo -e "${GREEN}✅ Build artifacts exist${NC}"

  # Show bundle sizes
  INDEX_SIZE=$(gzip -c dist/index.js | wc -c | tr -d ' ')
  echo "   📦 dist/index.js (gzipped): ${INDEX_SIZE} bytes"
else
  echo -e "${RED}❌ Build artifacts missing${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 10: Current version
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔟 Current package version..."
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "   Current version: ${CURRENT_VERSION}"
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
if [[ $ERRORS -eq 0 ]]; then
  echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║  ✅ ALL CHECKS PASSED - READY TO RELEASE! 🚀              ║${NC}"
  echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
  echo ""
  echo "Next steps:"
  echo "  1. Decide version bump:"
  echo "     - npm version patch  (${CURRENT_VERSION} → bug fixes)"
  echo "     - npm version minor  (${CURRENT_VERSION} → new features)"
  echo "     - npm version major  (${CURRENT_VERSION} → breaking changes)"
  echo ""
  echo "  2. Push with tags:"
  echo "     git push origin main --follow-tags"
  echo ""
  exit 0
else
  echo -e "${RED}╔════════════════════════════════════════════════════════╗${NC}"
  echo -e "${RED}║  ❌ ${ERRORS} ISSUE(S) FOUND - FIX BEFORE RELEASING        ║${NC}"
  echo -e "${RED}╚════════════════════════════════════════════════════════╝${NC}"
  echo ""
  echo "Please fix the issues above before releasing."
  echo ""
  exit 1
fi

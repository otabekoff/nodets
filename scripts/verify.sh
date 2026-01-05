#!/bin/bash
# ============================================================================
# scripts/verify.sh - Full Project Verification
# ============================================================================

set -e

echo "🔍 Running full project verification..."

# 1. Type check
echo "⌨️  Type checking..."
npm run type-check

# 2. Linting
echo "🧹 Linting..."
npm run lint

# 3. Tests
echo "🧪 Running all tests..."
npm test

echo "✅ All checks passed!"

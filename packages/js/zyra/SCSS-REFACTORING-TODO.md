# Zyra SCSS Refactoring Guide

## Current Status

The SCSS architecture has been analyzed and documented in `SCSS-ARCHITECTURE-ISSUES.md`.

## Key Issues Found

1. **Double imports** - Styles loaded multiple times
2. **Style overwrites** - Common styles conflict with component styles  
3. **Too many !important flags** - 20+ instances found
4. **No proper scoping** - Global class names can conflict
5. **Mixed import strategies** - Both @use and @import used

## Quick Fixes Implemented

### 1. Created Analysis Script
Run `node scripts/find-important.mjs` to find all !important usages

### 2. Created Proper SCSS Structure
```
styles/
├── abstracts/     # Variables, mixins (to be populated)
├── base/          # Base styles like buttons, inputs (to be populated)  
└── web/           # Current component styles
```

## Next Steps

### Immediate (Do First)
1. **Add namespace wrapper** to prevent conflicts
2. **Remove duplicate @use imports** from component files
3. **Test in Storybook** after each change

### Short-term (This Week)
1. Move shared styles from common.scss to base/ folder
2. Remove unnecessary !important flags
3. Update component SCSS to only have component-specific styles

### Long-term (Next Sprint)
1. Implement CSS Modules for full isolation
2. Set up PostCSS with PurgeCSS
3. Add Stylelint for SCSS standards

## Testing Checklist

After any SCSS changes:
- [ ] Run Storybook - all stories render correctly
- [ ] Check component spacing and layout
- [ ] Verify button styles (.admin-btn)
- [ ] Verify input styles (.basic-input)
- [ ] Check card components
- [ ] Test in actual WordPress plugin
- [ ] Check browser console for CSS errors

## Resources

- Full analysis: `SCSS-ARCHITECTURE-ISSUES.md`
- Find !important script: `scripts/find-important.mjs`
- Storybook: `pnpm run watch:storybook`

## Questions?

See the detailed analysis document for complete explanations and code examples.

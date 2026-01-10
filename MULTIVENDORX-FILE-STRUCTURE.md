# MultiVendorX Project File Structure Documentation

## Overview
MultiVendorX is a comprehensive monorepo project built using **pnpm workspaces**. It contains multiple WordPress plugins and a shared component library organized in a modular structure.

---

## Root Level Files

### Configuration Files

#### `package.json`
- **Purpose**: Root package.json for the monorepo
- **Key Features**:
  - Defines workspace-level scripts for building, linting, and testing
  - Manages shared development dependencies across all packages
  - Uses **pnpm@10.11.0** as package manager
  - Contains scripts like `build`, `lint`, `test`, `watch:storybook`
  - Enforces pnpm usage with `preinstall` script

#### `pnpm-workspace.yaml`
- **Purpose**: Defines the monorepo workspace structure
- **Content**: Specifies workspace packages:
  - `packages/js/*` - JavaScript/TypeScript packages
  - `packages/php/*` - PHP packages
  - `plugins/*` - WordPress plugins
  - `tools/storybook` - Development tools

#### `pnpm-lock.yaml`
- **Purpose**: Lock file for pnpm dependencies
- **Function**: Ensures consistent dependency versions across all installations

#### `.editorconfig`
- **Purpose**: Maintains consistent coding styles across different editors/IDEs
- **Standards**: Follows WordPress Coding Standards
- **Settings**:
  - UTF-8 charset
  - LF line endings
  - Tab indentation (size 4)
  - Special rules for markdown, JSON, YAML (space indentation)

#### `.eslintrc.js`
- **Purpose**: Root ESLint configuration
- **Extends**: WordPress ESLint plugin recommended settings
- **Applies To**: JavaScript/TypeScript files across the monorepo

#### `.gitignore`
- **Purpose**: Specifies files/folders to be ignored by Git
- **Includes**: `node_modules`, `pnpm-lock.yaml`

#### `.syncpackrc`
- **Purpose**: Configuration for syncpack tool
- **Function**: Ensures consistent package versions across workspace

### Documentation Files

#### `README.md`
- **Purpose**: Main project README (currently minimal)

#### `DEVELOPER-DOC.md`
- **Purpose**: Developer documentation for the project

---

## Directory Structure

### `/packages`
Contains reusable packages that can be shared across plugins.

#### `/packages/js/zyra`
**Purpose**: Shared React component library for MultiVendorX ecosystem

**Key Files**:
- `package.json`: Package configuration with build scripts
  - Uses **Rollup** for bundling
  - Wireit for build orchestration
  - Exports components via `build/index.js`
  
- `tsconfig.json`: TypeScript configuration
- `rollup.config.js`: Rollup bundler configuration
- `webpack.config.js`: Webpack configuration (alternative bundler)
- `eslint.config.js`: Package-specific ESLint rules

**Directories**:
- `/src`: Source TypeScript/React code
  - `/components`: Reusable React components
  - `/contexts`: React context providers
  - `/utils`: Utility functions
  - `/styles`: Component styles
  - `/assets`: Static assets
  - `index.ts`: Main entry point exporting all components
  - `global.scss`: Global styles

- `/build`: Compiled output (generated after build)
- `/stories`: Storybook stories for component documentation

**Purpose of Zyra**:
- Provides reusable UI components (ProPopup, Tables, Forms, etc.)
- Used by all plugins in the ecosystem
- Peer dependencies include: React, MUI, Emotion, React Router
- Packaged as a workspace dependency

---

### `/plugins`
Contains WordPress plugins that are part of the MultiVendorX ecosystem.

#### Common Plugin Structure
All plugins follow a similar structure:

**Configuration Files**:
- `package.json`: Build scripts, dependencies, metadata
- `composer.json`: PHP dependencies via Composer
- `config.php`: Plugin constants and configuration
- `webpack.config.js`: Build configuration for assets
- `tsconfig.json`: TypeScript compilation settings
- `phpcs.xml`: PHP CodeSniffer rules (WordPress Coding Standards)
- `phpunit.xml.dist`: PHPUnit test configuration
- `docker-compose.yml`: Local development environment

**Build Scripts** (in `/bin`):
- `clean-files.mjs`: Removes temporary files
- `minify.mjs`: Minifies built assets
- `move-files.mjs`: Organizes built files into release folder
- `release.mjs`: Creates release ZIP files
- `version-replace.mjs`: Updates version numbers
- `package-update-textdomain.js`: Updates translation domains
- `create-docker-compose.mjs`: Generates docker-compose.yml

**Common Directories**:
- `/src`: React/TypeScript source code for admin panels and frontend
- `/classes`: PHP class files (MVC pattern)
- `/templates`: PHP template files for UI rendering
- `/assets`: Static assets (images, styles)
- `/modules`: Feature modules (modular architecture)
- `/vendor`: Composer dependencies (auto-generated)
- `/release`: Built plugin ready for distribution
- `/log`: Plugin log files

---

#### `/plugins/multivendorx`
**Name**: MultiVendorX (formerly WC Vendors)
**Description**: Main marketplace plugin for multi-vendor WooCommerce sites

**Main File**: `dc_product_vendor.php`
**Version**: 5.0.0
**Display Name**: dc-woocommerce-multi-vendor

**Key Directories**:
- `/classes`: Core PHP classes
  - `MultiVendorX.php`: Main plugin class
  - `Admin.php`: Admin panel functionality
  - `Frontend.php`: Frontend features
  - `FrontendScripts.php`: Script/style enqueuing
  - `Block.php`: Gutenberg block support
  - `Install.php`: Installation/upgrade routines
  - `Modules.php`: Module management
  - `Setting.php`: Settings API
  - `SetupWizard.php`: Initial setup wizard
  - `Shortcode.php`: WordPress shortcodes
  - `Utill.php`: Utility functions
  - `/Commission`: Commission calculation logic
  - `/Emails`: Email template handlers
  - `/Order`: Order processing
  - `/Payments`: Payment gateway integration
  - `/RestAPI`: REST API endpoints
  - `/Store`: Vendor store management
  - `/Transaction`: Transaction handling
  - `/Notifications`: Notification system
  - `/Deprecated`: Backwards compatibility

**Scripts**:
- `build`: Builds the project using wireit
- `build:zip`: Creates distribution ZIP
- `build:release`: Full release build with version updates
- `env:start`: Starts local development environment
- `env:dev`: Development mode with hot reload
- `makepot`: Generates translation files

**Dependencies**:
- React 18.3.x
- Material-UI (@mui/material)
- Emotion (CSS-in-JS)
- WordPress blocks (@wordpress/blocks, @wordpress/components)

---

#### `/plugins/catalogx`
**Name**: CatalogX (formerly WooCommerce Catalog Enquiry)
**Description**: Converts WooCommerce store to catalog mode with enquiry forms

**Main File**: `Woocommerce_Catalog_Enquiry.php`
**Version**: 6.0.8
**Display Name**: woocommerce-catalog-enquiry

**Key Features**:
- Catalog mode (remove add to cart)
- Product enquiry forms
- Quote management
- Similar structure to multivendorx

**Modules**:
- `/Catalog`: Catalog mode functionality
- `/Enquiry`: Enquiry form handling
- `/Quote`: Quote request management

---

#### `/plugins/moowoodle`
**Name**: MooWoodle
**Description**: Integration between Moodle LMS and WooCommerce

**Main File**: `moowoodle.php`
**Purpose**: Synchronizes WooCommerce course purchases with Moodle enrollments

---

#### `/plugins/notifima`
**Name**: Notifima (Product Stock Alert)
**Description**: Product stock alert notifications for customers

**Main File**: `product_stock_alert.php`
**Purpose**: Notifies customers when out-of-stock products are available

---

### `/tools`

#### `/tools/storybook`
**Purpose**: Centralized Storybook instance for component development and documentation

**Key Files**:
- `package.json`: Storybook dependencies and scripts
  - `watch:build:storybook`: Runs Storybook dev server on port 6006
  - `build:storybook`: Builds static Storybook

- `vite.config.ts`: Vite configuration for Storybook
- `vitest.workspace.ts`: Vitest testing configuration

**Storybook Configuration** (`/.storybook`):
- `main.ts`: Storybook main configuration
- `preview.ts`: Global decorators and parameters
- `vitest.setup.ts`: Testing setup

**Purpose**:
- Provides isolated environment for component development
- Documents components with interactive examples
- Enables visual testing
- Integrates with Zyra component library

---

## Build System

### Wireit
- **Purpose**: Incremental build system
- **Used By**: All plugins and packages
- **Benefits**:
  - Caches build outputs
  - Runs builds only when files change
  - Orchestrates parallel builds

### Build Process Flow

1. **Source Code** (`/src`):
   - TypeScript/React components
   - SCSS/CSS styles

2. **Build Tools**:
   - **webpack**: Bundles assets (via `@wordpress/scripts`)
   - **rollup**: Bundles Zyra library
   - **babel**: Transpiles JavaScript
   - **sass**: Compiles SCSS to CSS

3. **Post-Build**:
   - Minification (`bin/minify.mjs`)
   - File organization (`bin/move-files.mjs`)
   - Cleanup (`bin/clean-files.mjs`)

4. **Output** (`/release` or `/build`):
   - Compiled JavaScript bundles
   - Minified CSS
   - Source maps
   - Production-ready assets

---

## Development Workflow

### Environment Setup
```bash
# Install dependencies
pnpm install

# Start development environment for a plugin
cd plugins/multivendorx
pnpm run env:dev

# Start Storybook
pnpm run watch:storybook
```

### Building
```bash
# Build all packages
pnpm run build

# Build specific plugin
cd plugins/catalogx
pnpm run build

# Watch mode (auto-rebuild)
pnpm run watch:build
```

### Testing
```bash
# Run all tests
pnpm run test

# Run PHP tests for a plugin
cd plugins/multivendorx
pnpm run test:php

# Lint code
pnpm run lint
```

### Creating a Release
```bash
cd plugins/multivendorx
pnpm run build:release
# Creates: release/multivendorx-{version}.zip
```

---

## Key Technologies

### Frontend
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Material-UI**: Component framework
- **Emotion**: CSS-in-JS
- **React Router**: Navigation
- **Zustand**: State management (in Zyra)

### Build Tools
- **pnpm**: Fast, disk-efficient package manager
- **Webpack 5**: Module bundler (via @wordpress/scripts)
- **Rollup**: Library bundler (for Zyra)
- **Wireit**: Build orchestration
- **Babel**: JavaScript compiler

### PHP
- **WordPress**: Plugin platform
- **WooCommerce**: E-commerce framework
- **Composer**: PHP dependency management
- **PHPUnit**: PHP testing
- **PHP_CodeSniffer**: Code quality (WordPress standards)

### Development
- **Storybook**: Component development environment
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **Docker**: Local development environment (@wordpress/env)

---

## File Naming Conventions

### PHP Files
- **Classes**: PascalCase (e.g., `MultiVendorX.php`, `Admin.php`)
- **Templates**: kebab-case (e.g., `vendor-dashboard.php`)
- **Config**: lowercase (e.g., `config.php`, `composer.json`)

### JavaScript/TypeScript
- **Components**: PascalCase (e.g., `ProPopup.tsx`, `DataTable.tsx`)
- **Utils**: camelCase (e.g., `formatDate.ts`, `apiHelper.ts`)
- **Config**: kebab-case (e.g., `webpack.config.js`, `rollup.config.js`)

### Build Scripts
- **Node Scripts**: kebab-case with `.mjs` extension (e.g., `clean-files.mjs`, `version-replace.mjs`)

---

## Dependencies Management

### Workspace Dependencies
Packages can reference each other using workspace protocol:
```json
{
  "dependencies": {
    "zyra": "workspace:*"
  }
}
```

### Version Synchronization
- **syncpack**: Ensures consistent versions across workspace
- Run: `pnpm run sync-dependencies`

### Shared vs Local Dependencies
- **Shared** (in root `package.json`): Build tools, testing, linting
- **Local** (in package `package.json`): Runtime dependencies specific to that package

---

## Translation/Internationalization

### Text Domains
- **multivendorx**: `multivendorx`
- **catalogx**: `catalogx`
- **moowoodle**: `moowoodle`
- **notifima**: `product_stock_alert`

### POT File Generation
Each plugin has a `makepot` script that:
- Scans PHP and JavaScript files
- Extracts translatable strings
- Creates `.pot` template file in `/languages`

### Translation Workflow
1. Run `pnpm run makepot`
2. Generate `.pot` file
3. Translators create `.po` files
4. Compile to `.mo` files for WordPress

---

## Release Process

### Version Bumping
1. Update version in `config.php`
2. Update version in `package.json`
3. Run `bin/version-replace.mjs` to sync versions

### Creating Release ZIP
```bash
pnpm run build:release
```

**Process**:
1. Clean previous builds
2. Update version numbers
3. Build assets (webpack/rollup)
4. Minify CSS/JS
5. Generate translation files
6. Copy files to `/release`
7. Create ZIP archive
8. Exclude dev files (node_modules, src, tests)

---

## Logging and Debugging

### Log Files
- `/log/catalogx.txt`: CatalogX debug logs
- `/log/multivendorx.txt`: MultiVendorX debug logs

### Debug Mode
Plugins include debug logging functionality controlled by WordPress `WP_DEBUG` constant.

---

## Docker Development Environment

### wordpress/env
All plugins use `@wordpress/env` for local development:

- **Configuration**: `.wp-env.json` (auto-generated)
- **Commands**:
  - `pnpm run env:start`: Start WordPress + MySQL
  - `pnpm run env:stop`: Stop containers
  - `pnpm run env:destroy`: Remove all containers

### Custom Database (Optional)
Some plugins include custom database setup via `bin/create-docker-compose.mjs`:
- Creates additional database services
- Configured via `docker-compose.yml`

---

## Summary

The MultiVendorX monorepo is a well-structured project that:
- Uses **pnpm workspaces** for efficient dependency management
- Shares common components via the **Zyra** library
- Follows **WordPress coding standards**
- Implements **modern JavaScript tooling** (React, TypeScript, Webpack)
- Provides **comprehensive build automation** (Wireit)
- Supports **local development** with Docker
- Enables **component documentation** with Storybook
- Maintains **code quality** with linting and testing

Each plugin is independently buildable and releasable while sharing common infrastructure and components.

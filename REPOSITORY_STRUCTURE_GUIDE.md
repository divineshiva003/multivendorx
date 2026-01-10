# Repository Structure & Developer Guide

## 📋 Table of Contents
- [Overview](#overview)
- [CatalogX Plugin (`plugins/catalogx`)](#catalogx-plugin)
- [Zyra Component Library (`packages/js/zyra`)](#zyra-component-library)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)

---

## Overview

This monorepo contains multiple WordPress plugins and shared JavaScript packages managed through **pnpm workspaces**. The two main components covered in this guide are:

1. **CatalogX** - A WooCommerce plugin for catalog mode, product enquiry, and quote requests
2. **Zyra** - A shared React/TypeScript component library used across multiple plugins

---

## CatalogX Plugin

**Location:** `plugins/catalogx/`

### 🎯 Purpose
CatalogX is a comprehensive WooCommerce plugin that transforms your online store into a flexible catalog system. It provides:
- Catalog mode (hide prices, disable cart)
- Product enquiry forms
- Quote request management
- Wholesale pricing and dynamic rules
- B2B/B2C hybrid functionality

### 📁 Directory Structure

```
plugins/catalogx/
├── Woocommerce_Catalog_Enquiry.php    # Main plugin file (entry point)
├── config.php                          # Plugin configuration constants
├── composer.json                       # PHP dependencies
├── package.json                        # Node dependencies & scripts
├── webpack.config.js                   # Build configuration
├── tsconfig.json                       # TypeScript configuration
├── phpcs.xml                           # PHP CodeSniffer rules
├── phpunit.xml.dist                    # PHPUnit test configuration
│
├── classes/                            # PHP classes (Backend logic)
│   ├── CatalogX.php                   # Main plugin class
│   ├── Admin.php                      # Admin menu & enqueue scripts
│   ├── Frontend.php                   # Frontend hooks & filters
│   ├── FrontendScripts.php            # Frontend asset management
│   ├── Block.php                      # Gutenberg block registration
│   ├── Rest.php                       # REST API endpoints
│   ├── Setting.php                    # Settings management
│   ├── SetupWizard.php                # Setup wizard
│   ├── Shortcode.php                  # Shortcode handlers
│   ├── Install.php                    # Installation & activation
│   ├── Modules.php                    # Module loader & manager
│   ├── Utill.php                      # Utility functions
│   ├── Core/                          # Core functionality
│   │   ├── QuoteCart.php             # Quote cart management
│   │   └── Session.php               # Session handling
│   └── Emails/                        # Email templates & handlers
│
├── modules/                            # Feature modules (modular architecture)
│   ├── Catalog/                       # Catalog mode module
│   │   ├── Module.php                # Module registration
│   │   ├── Admin.php                 # Admin interface
│   │   ├── Frontend.php              # Frontend logic
│   │   └── Util.php                  # Module utilities
│   ├── Enquiry/                       # Product enquiry module
│   │   ├── Module.php
│   │   ├── Ajax.php                  # AJAX handlers
│   │   ├── Frontend.php
│   │   ├── Rest.php                  # REST endpoints
│   │   ├── Util.php
│   │   └── assets/                   # Module-specific assets
│   └── Quote/                         # Quotation module
│       ├── Module.php
│       ├── Admin.php
│       ├── Ajax.php
│       ├── Frontend.php
│       ├── Rest.php
│       ├── Util.php
│       └── assets/
│
├── src/                                # React/TypeScript frontend source
│   ├── index.tsx                      # Main entry point (renders App)
│   ├── app.tsx                        # Root React component (routing)
│   ├── global.d.ts                    # TypeScript global declarations
│   │
│   ├── components/                    # React components
│   │   ├── Settings/                 # Settings pages
│   │   ├── Modules/                  # Module management UI
│   │   ├── QuoteRequests/           # Quote request dashboard
│   │   ├── EnquiryMessages/         # Enquiry messages dashboard
│   │   ├── WholesaleUser/           # Wholesale user management
│   │   ├── Rules/                   # Dynamic pricing rules
│   │   └── Popup/                   # Modal/popup components
│   │
│   ├── block/                         # Gutenberg block definitions
│   │   ├── enquiry-button/          # Enquiry button block
│   │   │   ├── index.js             # Block registration
│   │   │   ├── block.json           # Block metadata
│   │   │   └── render.php           # Server-side rendering
│   │   ├── enquiryForm/             # Enquiry form block
│   │   ├── quote-button/            # Quote button block
│   │   ├── quote-cart/              # Quote cart block
│   │   └── setupWizard/             # Setup wizard block
│   │
│   ├── services/                      # API services
│   │   └── templateService.ts        # Template management API
│   │
│   └── assets/                        # Static assets
│       └── images/                   # Images, icons, etc.
│
├── templates/                          # PHP template files
│   ├── quote-button-template.php     # Quote button template
│   └── emails/                        # Email templates
│
├── assets/                             # Built/compiled assets (output)
│   ├── images/                        # Static images
│   └── styles/                        # Additional styles
│
├── bin/                                # Build & utility scripts
│   ├── clean-files.mjs               # Clean build artifacts
│   ├── create-docker-compose.mjs     # Docker setup
│   ├── minify.mjs                    # Asset minification
│   ├── move-files.mjs                # File organization
│   ├── package-update-textdomain.js  # i18n domain update
│   ├── release.mjs                   # Release packaging
│   └── version-replace.mjs           # Version updates
│
├── log/                                # Log files
│   └── catalogx.txt
│
└── release/                            # Built plugin package (generated)
    └── assets/                        # Compiled JS/CSS
        └── js/
            ├── index.js               # Main admin bundle
            ├── block/                 # Block scripts
            ├── chunks/                # Code-split chunks
            └── externals/             # Vendor libraries
```

### 🔑 Key Files Explained

#### **Main Plugin File**
- **`Woocommerce_Catalog_Enquiry.php`**: WordPress plugin header, autoloader, initializes CatalogX class
- **`config.php`**: Defines constants (version, URLs, slug)

#### **Core Classes**
- **`classes/CatalogX.php`**: Main plugin class, handles initialization, activation, deactivation, compatibility declarations
- **`classes/Admin.php`**: Registers admin menu, enqueues admin scripts/styles, handles translations
- **`classes/Frontend.php`**: Frontend hooks, filters, template overrides
- **`classes/Modules.php`**: Module system - loads and manages feature modules dynamically
- **`classes/Rest.php`**: Registers REST API endpoints for AJAX operations
- **`classes/Block.php`**: Registers Gutenberg blocks

#### **Frontend (React/TypeScript)**
- **`src/index.tsx`**: Entry point - imports Zyra CSS, renders `<App />` into `#admin-main-wrapper`
- **`src/app.tsx`**: Defines routing logic using `react-router-dom`, renders different components based on URL hash parameters (`?tab=settings`, `?tab=modules`, etc.)

#### **Build Configuration**
- **`webpack.config.js`**: 
  - Multiple entry points (admin app, blocks)
  - Code splitting for vendor dependencies
  - SCSS compilation with PostCSS
  - Copies fonts from Zyra package
  - Outputs to `release/assets/`

### 🎨 Module Architecture

CatalogX uses a **modular architecture** where features are isolated into modules:

1. **Catalog Module** (`modules/Catalog/`):
   - Controls catalog mode functionality
   - Hides prices, removes cart buttons
   - Manages visibility settings

2. **Enquiry Module** (`modules/Enquiry/`):
   - Product enquiry forms
   - AJAX submission handlers
   - REST API for enquiry management
   - Email notifications

3. **Quote Module** (`modules/Quote/`):
   - Quote request system
   - Quote cart functionality
   - Admin quote management
   - Customer quote dashboard

Each module follows a consistent structure:
- `Module.php`: Module registration and hooks
- `Admin.php`: Admin-specific functionality
- `Frontend.php`: Frontend rendering and logic
- `Ajax.php`: AJAX handlers
- `Rest.php`: REST API endpoints
- `Util.php`: Helper functions

### 🔌 Blocks (Gutenberg)

Located in `src/block/`, each block has:
- `index.js`: Block registration and editor interface
- `block.json`: Block metadata (title, icon, category, attributes)
- `render.php`: Server-side rendering callback

Blocks are bundled separately by webpack and registered via `classes/Block.php`.

### 📦 Build Scripts

**Key npm scripts** (from `package.json`):

```bash
# Development
pnpm watch:build                    # Watch mode for development
pnpm watch:build:project:bundle     # Webpack watch mode

# Production Build
pnpm build                          # Build all sub-projects
pnpm build:project:bundle           # Webpack production build
pnpm minify                         # Minify assets
pnpm build:zip                      # Create release package

# Linting & Testing
pnpm lint                           # Run all linters
pnpm lint:lang:js                   # ESLint for JS/TS
pnpm lint:lang:php                  # PHPCS for PHP
pnpm test                           # Run PHPUnit tests

# Development Environment
pnpm env:dev                        # Start wp-env + database + storybook
pnpm env:start                      # Start WordPress environment
pnpm env:stop                       # Stop environment

# Utilities
pnpm makepot                        # Generate translation file
pnpm changelog                      # Generate changelog
```

### 🌐 REST API Endpoints

REST endpoints are registered with namespace `catalogx/v1`:
- `/settings` - Get/update settings
- `/modules` - Module management
- `/enquiries` - Enquiry CRUD operations
- `/quotes` - Quote management
- `/templates` - Email template management

### 🎨 Frontend Routing

The admin interface uses hash-based routing:
- `#&tab=settings` → Settings page
- `#&tab=modules` → Module management
- `#&tab=quote-requests` → Quote requests dashboard
- `#&tab=enquiry-messages` → Enquiry messages
- `#&tab=wholesale-users` → Wholesale user management
- `#&tab=rules` → Dynamic pricing rules

---

## Zyra Component Library

**Location:** `packages/js/zyra/`

### 🎯 Purpose
Zyra is a reusable React/TypeScript component library designed for WordPress plugin development. It provides consistent UI components, styling, and utilities across multiple plugins in the monorepo.

### 📁 Directory Structure

```
packages/js/zyra/
├── package.json                       # Package metadata & scripts
├── rollup.config.js                   # Rollup bundler configuration
├── tsconfig.json                      # TypeScript configuration
├── webpack.config.js                  # Alternative webpack config
├── eslint.config.js                   # ESLint configuration
├── README.md                          # User documentation
├── DEVELOPER-DOC.md                   # Developer documentation
│
├── src/                               # Source code
│   ├── index.ts                      # Main export file (barrel exports)
│   ├── global.scss                   # Global styles
│   │
│   ├── components/                   # React components
│   │   ├── AdminForm.tsx            # Form container component
│   │   ├── AdminHeader.tsx          # Admin page header
│   │   ├── AdminBreadcrumbs.tsx     # Breadcrumb navigation
│   │   ├── Banner.tsx               # Banner/notification component
│   │   ├── BasicInput.tsx           # Basic input field
│   │   ├── SimpleInput.tsx          # Simple input wrapper
│   │   ├── TextArea.tsx             # Textarea component
│   │   ├── SelectInput.tsx          # Select dropdown
│   │   ├── RadioInput.tsx           # Radio button group
│   │   ├── MultiCheckbox.tsx        # Multiple checkboxes
│   │   ├── ToggleSetting.tsx        # Toggle switch
│   │   ├── ColorSettingInput.tsx    # Color picker
│   │   ├── FileInput.tsx            # File upload
│   │   ├── CalendarInput.tsx        # Date picker (single)
│   │   ├── MultiCalendarInput.tsx   # Date range picker
│   │   ├── DatePicker.tsx           # Alternative date picker
│   │   ├── TimePicker.tsx           # Time selection
│   │   ├── Table.tsx                # Data table component
│   │   ├── Tabs.tsx                 # Tab navigation
│   │   ├── Section.tsx              # Settings section wrapper
│   │   ├── SubTabSection.tsx        # Sub-tab section
│   │   ├── Popup.tsx                # Modal/popup (ProPopup)
│   │   ├── CommonPopup.tsx          # Common popup variant
│   │   ├── Label.tsx                # Form label
│   │   ├── BlockText.tsx            # Text block component
│   │   ├── Modules.tsx              # Module management UI
│   │   ├── SettingMetaBox.tsx       # Settings meta box
│   │   ├── ShortCodeTable.tsx       # Shortcode display table
│   │   ├── WpEditor.tsx             # WordPress editor wrapper
│   │   ├── GoogleMap.tsx            # Google Maps integration
│   │   ├── Mapbox.tsx               # Mapbox integration
│   │   ├── IconList.tsx             # Icon selector
│   │   ├── Support.tsx              # Support widget
│   │   ├── Log.tsx                  # Log viewer
│   │   ├── TourSteps.tsx            # Product tour component
│   │   ├── TourSetup.tsx            # Tour setup/configuration
│   │   ├── FormViewer.tsx           # Form preview
│   │   ├── ExpandablePanelGroup.tsx # Accordion/expandable panels
│   │   ├── SuccessNotice.tsx        # Success notification
│   │   ├── DynamicRowSetting.tsx    # Dynamic repeatable rows
│   │   ├── DropDownMapping.tsx      # Dropdown field mapping
│   │   ├── DoActionBtn.tsx          # Action button component
│   │   ├── EmailsInput.tsx          # Email list input
│   │   ├── InputWithSuggestions.tsx # Autocomplete input
│   │   ├── MergeComponent.tsx       # Component merger utility
│   │   ├── NestedComponent.tsx      # Nested component wrapper
│   │   ├── HoverInputRender.tsx     # Hover-activated input
│   │   ├── Attachment.tsx           # File attachment display
│   │   ├── DisplayButton.tsx        # Display/preview button
│   │   ├── Elements.tsx             # Generic element renderer
│   │   ├── MultipleOption.tsx       # Multiple option selector
│   │   ├── MultiInput.tsx           # Multiple input fields
│   │   ├── MultiCheckboxTable.tsx   # Checkbox table
│   │   ├── Recaptcha.tsx            # reCAPTCHA integration
│   │   ├── InputMailchimpList.tsx   # Mailchimp list selector
│   │   ├── RegistrationForm.tsx     # User registration form
│   │   │
│   │   ├── ButtonCustomiser.tsx     # Button style customizer
│   │   ├── CatalogCustomizer.tsx    # Catalog-specific customizer
│   │   ├── FreeProFormCustomizer.tsx # Form customizer
│   │   ├── NotifimaFormCustomizer.tsx # Notifima form customizer
│   │   │
│   │   ├── EmailTemplate/           # Email template components
│   │   │   ├── TemplateSection.tsx
│   │   │   └── TemplateTextArea.tsx
│   │   │
│   │   └── UI/                      # Base UI components
│   │       ├── Container.tsx        # Layout container
│   │       ├── Column.tsx           # Grid column
│   │       ├── Card.tsx             # Card component
│   │       ├── FormGroup.tsx        # Form group wrapper
│   │       ├── FormGroupWrapper.tsx # Form group container
│   │       ├── AdminButton.tsx      # Styled button
│   │       ├── InfoItem.tsx         # Info display item
│   │       └── Analytics.tsx        # Analytics widget
│   │
│   ├── contexts/                    # React Context providers
│   │   ├── ModuleContext.tsx       # Module state management
│   │   ├── SettingContext.tsx      # Settings state management
│   │   └── ThemeContext.tsx        # Theme management
│   │
│   ├── utils/                       # Utility functions
│   │   ├── apiService.ts           # API call utilities
│   │   └── settingUtil.ts          # Settings helpers
│   │
│   ├── styles/                      # SCSS stylesheets
│   │   ├── fonts.scss              # Font imports and icon fonts
│   │   ├── common.scss             # Common/shared styles
│   │   └── (component styles in web/)
│   │
│   └── assets/                      # Static assets
│       └── fonts/                   # Font files
│           ├── *.eot
│           ├── *.woff
│           ├── *.woff2
│           ├── *.ttf
│           └── *.svg
│
├── stories/                          # Storybook stories
│   ├── AdminForm.stories.tsx
│   ├── Banner.stories.tsx
│   ├── Table.stories.tsx
│   ├── Tabs.stories.tsx
│   ├── (... one story per component)
│   └── *.stories.tsx
│
└── build/                            # Compiled output (generated)
    ├── index.js                     # Bundled JS (ESM)
    ├── index.d.ts                   # TypeScript declarations
    ├── index.css                    # Compiled CSS
    └── assets/
        └── fonts/                    # Copied font files
```

### 🔑 Key Files Explained

#### **Main Export File**
- **`src/index.ts`**: Central export point for all components, contexts, and utilities. Consumers import from here:
  ```typescript
  import { AdminForm, Banner, Table } from 'zyra';
  import 'zyra/build/index.css';
  ```

#### **Components**
All components are:
- Written in **TypeScript**
- Functional components with **React hooks**
- Fully typed with TypeScript interfaces
- Styled with **SCSS modules**
- Documented with **Storybook stories**

#### **Contexts**
- **`ModuleContext.tsx`**: Manages module state (active modules, module data)
  - `useModules()` hook
  - `initializeModules()` helper
  
- **`SettingContext.tsx`**: Manages plugin settings state
  - `useSetting()` hook
  - `SettingProvider` component
  
- **`ThemeContext.tsx`**: Theme/styling management

#### **Utilities**
- **`apiService.ts`**: WordPress REST API helpers
  - `getApiResponse()` - Fetch data
  - `sendApiResponse()` - POST/PUT data
  - `getApiLink()` - Build API URLs
  
- **`settingUtil.ts`**: Settings manipulation utilities

#### **Styles**
- **`styles/fonts.scss`**: Imports custom fonts and icon fonts
- **`styles/common.scss`**: Shared styles, variables, mixins
- **`global.scss`**: Global CSS reset and base styles

### 🎨 Component Categories

#### **Form Components**
Input and form-related components for building admin interfaces:
- `BasicInput`, `SimpleInput`, `TextArea`
- `SelectInput`, `RadioInput`, `MultiCheckbox`
- `ToggleSetting`, `ColorSettingInput`
- `CalendarInput`, `MultiCalendarInput`, `DatePicker`, `TimePicker`
- `FileInput`, `EmailsInput`
- `InputWithSuggestions` (autocomplete)

#### **Layout Components**
Structural components for page layout:
- `Container`, `Column`, `Card`
- `FormGroup`, `FormGroupWrapper`
- `Section`, `SubTabSection`
- `ExpandablePanelGroup`

#### **Navigation Components**
- `Tabs`, `AdminBreadcrumbs`
- `AdminHeader`

#### **Data Display**
- `Table` - Full-featured data table
- `ShortCodeTable` - Display shortcodes
- `Log` - Log viewer
- `IconList` - Icon selector grid

#### **Interactive Components**
- `Popup` (ProPopup) - Modal dialogs
- `CommonPopup` - Standard popup
- `Banner` - Notifications/alerts
- `SuccessNotice` - Success messages
- `TourSteps`, `TourSetup` - Product tours

#### **Specialized Components**
- `WpEditor` - WordPress editor integration
- `GoogleMap`, `Mapbox` - Map components
- `Modules` - Module management UI
- `Support` - Support ticket widget
- `RegistrationForm` - User registration
- `Recaptcha` - CAPTCHA integration

#### **Customizers**
- `ButtonCustomiser` - Button styling
- `CatalogCustomizer` - Catalog appearance
- `FreeProFormCustomizer` - Form designer
- `NotifimaFormCustomizer` - Notifima-specific form

### 📦 Build Configuration

**Rollup Configuration** (`rollup.config.js`):
- **Input**: `src/index.ts`
- **Output**: `build/` directory (ESM format)
- **Plugins**:
  - `peerDepsExternal`: Externalizes peer dependencies (React, etc.)
  - `typescript`: Compiles TypeScript
  - `postcss`: Compiles SCSS → CSS
  - `copy`: Copies font assets
  - `terser`: Minifies output
- **Tree-shaking**: Enabled for optimal bundle size

### 🎭 Storybook

Located in `stories/`, each component has a `.stories.tsx` file for:
- Visual component documentation
- Interactive playground
- Testing different prop combinations
- Usage examples

**Run Storybook**:
```bash
# From root directory
pnpm run watch:storybook
```

### 📦 Build Scripts

**Key npm scripts** (from `package.json`):

```bash
# Development
pnpm watch:build                    # Watch mode - rebuilds on changes
pnpm watch:build:project:bundle     # Rollup watch mode

# Production Build
pnpm build                          # Build library
pnpm build:project:bundle           # Rollup production build

# Linting
pnpm lint                           # Run all linters
pnpm lint:lang:js                   # ESLint for TypeScript
pnpm lint:lang:css                  # Stylelint for SCSS
pnpm lint:fix:js                    # Auto-fix JS issues
pnpm lint:fix:css                   # Auto-fix CSS issues
```

### 🔧 TypeScript Configuration

**`tsconfig.json`** settings:
- Target: ES2015+
- Module: ESNext
- JSX: React
- Declaration: true (generates `.d.ts` files)
- Strict mode enabled
- Path aliases configured

### 🎨 Styling Architecture

1. **Component-specific styles**: Each component has its own SCSS file
2. **Common styles**: Shared in `styles/common.scss`
3. **Font styles**: Defined in `styles/fonts.scss`
4. **Build output**: Single `index.css` file

### 📝 Usage in Other Plugins

To use Zyra in a plugin:

1. **Add dependency** in `package.json`:
```json
{
  "dependencies": {
    "zyra": "workspace:*"
  }
}
```

2. **Import CSS** (once, in main entry file):
```typescript
import 'zyra/build/index.css';
```

3. **Import components**:
```typescript
import { AdminForm, Banner, Table, useSetting } from 'zyra';

const MyComponent = () => {
  return (
    <AdminForm>
      <Banner type="success" message="Hello!" />
      <Table data={myData} columns={columns} />
    </AdminForm>
  );
};
```

### 🌐 Peer Dependencies

Zyra requires these packages to be installed in the consuming project:
- `react` (18.3.x)
- `react-dom` (18.3.x)
- `@emotion/react`, `@emotion/styled`
- `@mui/material`
- `react-router-dom`
- `react-select`
- Plus others (see `package.json` peerDependencies)

---

## Getting Started

### Prerequisites

1. **Node.js** (v18 or higher)
2. **pnpm** (package manager)
3. **PHP** 8.0+
4. **Composer**
5. **WordPress** 6.4+
6. **WooCommerce** 8.2+

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd multivendorx

# 2. Install pnpm globally (if not installed)
npm install -g pnpm

# 3. Install dependencies
pnpm install

# 4. Build Zyra library (must be built first)
cd packages/js/zyra
pnpm run build

# 5. Build CatalogX plugin
cd ../../plugins/catalogx
pnpm run build
```

### Development Setup

#### **Option 1: Local WordPress Environment**

```bash
# Start WordPress environment (wp-env)
cd plugins/catalogx
pnpm env:start

# Watch mode for development
pnpm watch:build
```

Access at: `http://localhost:8888`

#### **Option 2: Manual Setup**

1. Copy `plugins/catalogx` to your WordPress `wp-content/plugins/` directory
2. Activate the plugin in WordPress admin
3. Run watch mode:
```bash
cd plugins/catalogx
pnpm watch:build
```

#### **Storybook Development**

```bash
# From root directory
pnpm run watch:storybook
```

Access at: `http://localhost:6006`

---

## Development Workflow

### 🔄 Typical Workflow

#### **Working on Zyra Components**

1. **Create/Edit Component**:
   ```typescript
   // packages/js/zyra/src/components/MyComponent.tsx
   import React from 'react';
   
   interface MyComponentProps {
     title: string;
   }
   
   const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
     return <div>{title}</div>;
   };
   
   export default MyComponent;
   ```

2. **Export in `index.ts`**:
   ```typescript
   export { default as MyComponent } from './components/MyComponent';
   ```

3. **Create Storybook Story**:
   ```typescript
   // stories/MyComponent.stories.tsx
   import MyComponent from '../src/components/MyComponent';
   
   export default {
     title: 'Components/MyComponent',
     component: MyComponent,
   };
   
   export const Default = () => <MyComponent title="Hello" />;
   ```

4. **Build**:
   ```bash
   pnpm run build
   ```

#### **Working on CatalogX**

1. **Backend (PHP)**:
   - Edit files in `classes/` or `modules/`
   - Follow WordPress coding standards
   - Test with PHPUnit: `pnpm test:php`

2. **Frontend (React)**:
   - Edit files in `src/components/`
   - Import Zyra components as needed
   - Run watch mode: `pnpm watch:build`
   - Webpack auto-recompiles on changes

3. **Add New Module**:
   - Create folder in `modules/YourModule/`
   - Add `Module.php` with registration
   - Add to `Modules.php` filter
   - Create admin/frontend classes

4. **Add Gutenberg Block**:
   - Create folder in `src/block/your-block/`
   - Add `index.js`, `block.json`, `render.php`
   - Add entry in `webpack.config.js`
   - Register in `classes/Block.php`

### 🧪 Testing

```bash
# PHP Tests (CatalogX)
cd plugins/catalogx
pnpm test:php

# Linting
pnpm lint:lang:php    # PHP
pnpm lint:lang:js     # JavaScript/TypeScript
pnpm lint:lang:css    # Styles

# Fix automatically
pnpm lint:fix
```

### 📦 Building for Production

```bash
# Build Zyra
cd packages/js/zyra
pnpm run build

# Build CatalogX
cd ../../plugins/catalogx
pnpm run build

# Create release package
pnpm run build:zip
```

This creates a distributable `.zip` file in the `release/` directory.

### 🌍 Internationalization (i18n)

```bash
# Generate .pot file
cd plugins/catalogx
pnpm makepot
```

Translation files are stored in `languages/`.

### 🐛 Debugging

1. **Enable WordPress Debug Mode**:
   ```php
   // wp-config.php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   ```

2. **Check Logs**:
   - PHP errors: `wp-content/debug.log`
   - CatalogX logs: `plugins/catalogx/log/catalogx.txt`

3. **Browser DevTools**:
   - React DevTools extension
   - Redux DevTools (if using Redux)
   - Network tab for API calls

---

## Architecture Diagrams

### CatalogX Data Flow

```
User Request
     ↓
WordPress Router
     ↓
CatalogX Main Class (CatalogX.php)
     ↓
Modules System (Modules.php)
     ↓
Individual Modules (Catalog, Enquiry, Quote)
     ↓
Frontend.php / Admin.php
     ↓
React Components (src/components/)
     ↓
REST API (Rest.php) ←→ Database
     ↓
Response to User
```

### Zyra Component Flow

```
Consumer Plugin
     ↓
Import Zyra Component
     ↓
Zyra Component (packages/js/zyra/src/components/)
     ↓
Uses Contexts (ModuleContext, SettingContext)
     ↓
API Utilities (utils/apiService.ts)
     ↓
WordPress REST API
     ↓
Plugin Backend
```

---

## Best Practices

### 💡 Code Style

- **TypeScript**: Use explicit types, avoid `any`
- **React**: Use functional components and hooks
- **PHP**: Follow WordPress Coding Standards
- **CSS**: Use BEM naming convention
- **Comments**: Document complex logic

### 🔒 Security

- Sanitize all inputs
- Escape all outputs
- Use nonces for AJAX/REST
- Check user capabilities
- Validate data on server-side

### ⚡ Performance

- Minimize API calls
- Use code splitting (webpack chunks)
- Lazy load components when possible
- Optimize images
- Minify production builds

### 📚 Documentation

- Add JSDoc comments to functions
- Update README when adding features
- Create Storybook stories for new components
- Document breaking changes in CHANGELOG

---

## Troubleshooting

### Common Issues

**Issue: "Module not found: zyra"**
- Solution: Build Zyra first: `cd packages/js/zyra && pnpm run build`

**Issue: Webpack build fails**
- Solution: Clear cache: `rimraf node_modules/.cache && pnpm install`

**Issue: Styles not loading**
- Solution: Import Zyra CSS in entry file: `import 'zyra/build/index.css';`

**Issue: PHP fatal error on activation**
- Solution: Run `composer install` in plugin directory

**Issue: Hot reload not working**
- Solution: Restart watch mode: `pnpm watch:build`

---

## Resources

### CatalogX
- **Website**: https://catalogx.com
- **Documentation**: https://catalogx.com/docs/
- **Demo**: https://multivendordemo.com/catalogx/

### Zyra
- **Storybook**: Run `pnpm run watch:storybook`
- **TypeScript Docs**: Built-in type definitions
- **Component List**: See `src/index.ts`

### External
- **WordPress**: https://developer.wordpress.org/
- **WooCommerce**: https://woocommerce.com/documentation/
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes and commit: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Create Pull Request

---

## License

- **CatalogX**: GPL-2.0-or-later
- **Zyra**: GPL-2.0-or-later

---

## Support

For questions or issues:
- **Documentation**: Read the docs thoroughly
- **GitHub Issues**: Report bugs or request features
- **Support**: Contact MultiVendorX support

---

**Last Updated**: January 2026  
**Version**: CatalogX 6.0.8, Zyra 1.0.0

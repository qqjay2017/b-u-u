# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **battery-uniapp-ui**, a cross-platform Vue 3 component library built on the uni-app framework. It ships as a `uni_modules` package and targets H5, iOS/Android apps, WeChat/Alipay/Baidu/Toutiao/QQ/Kuaishou/Lark mini-programs, and Quick Apps. The repo also contains a VitePress documentation site and a demo application.

## Common Commands

```bash
# Development (H5 is the fastest for local dev)
pnpm dev:h5             # H5 dev server
pnpm dev:mp-weixin      # WeChat mini-program

# Build
pnpm build:h5
pnpm build:mp-weixin

# Lint (auto-fix)
pnpm lint

# Type check
pnpm type-check

# Tests
pnpm test               # Run all tests (watch mode)
pnpm test:h5            # H5 platform tests
pnpm test:mp-weixin     # WeChat platform tests
pnpm test:all           # Run H5 + WeChat tests sequentially
pnpm coverage           # Test coverage (run once, no watch)
# Run a single test file:
pnpm test src/path/to/file.test.ts

# Docs
pnpm dev:docs           # VitePress dev server (port 5174)
pnpm build:docs         # Build H5 demo + docs

# Scripts (run via esno)
pnpm gendoc             # Auto-generate component docs from JSDoc prop comments
pnpm build:web-types    # Build IDE web-types for component completion
pnpm build:theme-vars   # Generate CSS variable documentation
```

Commits must follow Conventional Commits (enforced by `commitlint`). Use `pnpm commit` to run the interactive Commitizen CLI.

## Architecture

### Package Manager
This repo **requires pnpm** (`preinstall` hook enforces it). npm registry is mirrored to `npmmirror.com` (see `.npmrc`).

### Repository Layout

```
src/
  uni_modules/battery-uniapp-ui/   # The component library itself
    components/
      bt-*/                        # Individual components
      common/                      # Shared utilities, SCSS variables, composables
    composables/                   # Exported Vue composables
  pages/                           # Demo app main pages
  subPages/                        # Sub-package demo pages
  components/                      # Demo app wrapper components
  store/                           # Dark mode reactive store — module-level ref, no Pinia
  locale/                          # i18n (zh-CN, en-US)
docs/                              # VitePress documentation site
scripts/                           # Build, release, doc-gen scripts (run via esno)
vite-plugins/                      # Custom Vite plugins (conditional compile)
```

### Component Structure

Each component lives in `src/uni_modules/battery-uniapp-ui/components/bt-<name>/`:
- `bt-<name>.vue` — component implementation using Vue 3 `<script setup>`
- `types.ts` — prop types and emits interface
- `index.scss` — scoped styles

Shared internals under `components/common/`:
- `abstracts/variable.scss` — SCSS design token variables (CSS custom properties with `--bt-*` fallback pattern)
- `abstracts/_mixin.scss`, `_function.scss`, `_config.scss` — SCSS mixins, functions, and config
- `util.ts` — common utility functions
- `props.ts` — shared prop factory helpers (`makeBooleanProp`, `makeStringProp`, etc.) and `baseProps` (`customStyle`, `customClass`)
- `clickoutside.ts` — click-outside directive
- `interceptor.ts` — request/response interceptors

### Styling System

CSS custom properties follow the `--bt-*` naming convention (e.g., `--bt-color-theme`). SCSS variables reference them with fallbacks:
```scss
$-color-theme: var(--bt-color-theme, $default-theme) !default;
```

Dark mode is supported via `theme.json` and CSS variable overrides. Do not hardcode colors — use the established SCSS variables.

### Cross-Platform Conditional Compilation

Use uni-app's `#ifdef` / `#ifndef` directives for platform-specific code:
```js
// #ifdef H5
import viteCompression from 'vite-plugin-compression'
// #endif
```

### i18n

Translations are in `src/locale/`. The custom i18n wrapper supports both named and positional parameters. Page titles use `%key%` format in `pages.json`.

### Code Style

- **No semicolons**, **single quotes**, 150-char print width (Prettier)
- Vue 3 Composition API with `<script setup>` throughout
- TypeScript — use `type` imports (`import type { Foo }`)
- ESLint is lenient on `any` and `console` for development flexibility


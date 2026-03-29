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

### New Component

When adding a new component, update the repo in these places.

#### 1. Component files

Create a new directory under `src/uni_modules/battery-uniapp-ui/components/bt-<name>/` and usually include:

- `bt-<name>.vue` — component implementation, Vue 3 `<script setup lang="ts">`
- `types.ts` — props/types/interfaces, usually based on `components/common/props.ts`
- `index.scss` — component styles
- `index.ts` — type exports for external TS usage
- extra internal files only if they are actually used by the public component

Implementation rules:

- Component `name` should use the `bt-<name>` convention
- Add `options` when needed to match repo behavior:
  - `addGlobalClass: true`
  - `virtualHost: true`
  - `styleIsolation: 'shared'`
- Reuse `baseProps` so `customStyle` / `customClass` stay consistent
- Prefer existing SCSS variables from `components/common/abstracts/variable.scss`
- If new theme variables are needed, add them to `variable.scss` with `--bt-*` CSS variable fallback style

#### 2. Global type registration

Update `src/uni_modules/battery-uniapp-ui/global.d.ts`:

- Add the new global component type, e.g. `BtUploadImage`

If the component is meant to expose TS types publicly:

- Add / update `index.ts` in the component directory to export `Props`, `Instance`, and related custom types

#### 3. Demo page

Add a demo page under `src/subPages/<camelName>/Index.vue`.

Then wire it into the demo app:

- `src/pages.json`
  - add a sub-package page entry under `subPages`
  - if title needs i18n, use `%key%`
- `src/pages/index/Index.vue`
  - add the component entry in the correct category list

#### 4. Docs page

Add component docs under `docs/component/<name>.md`.

Recommended doc structure:

- intro
- basic usage
- major variants / states
- complete demo source via `<DemoCode src="subPages/<camelName>/Index.vue" />`
- API section
- theme variables section if applicable

Then wire docs navigation:

- `docs/.vitepress/locales/zh-CN.ts`
- `docs/.vitepress/locales/en-US.ts`

Add the new page into the correct sidebar group.

#### 5. Optional i18n wiring

Only update `src/locale/*.json` when the component demo page title or demo content depends on locale keys.

Typical case:

- `src/pages.json` uses `%xxx-title%`
- then `src/locale/zh-CN.json` and `src/locale/en-US.json` need matching keys

#### 6. Optional build metadata

Depending on how complete the component integration needs to be, also check whether these should be regenerated:

- `pnpm build:web-types`
- `pnpm gendoc`
- `pnpm build:theme-vars`

Do this when component API metadata, IDE completion data, or theme variable docs are expected to stay in sync.

#### 7. Validation checklist

Before finishing, run the smallest useful set of checks:

- `pnpm exec eslint <changed files>`
- `pnpm exec vitepress build docs` if docs changed
- `pnpm type-check`

If `type-check` fails, separate:

- errors introduced by the new component
- pre-existing repo errors

#### 8. Practical checklist

For a normal new component with docs and demo, the usual touched files are:

- `src/uni_modules/battery-uniapp-ui/components/bt-<name>/...`
- `src/uni_modules/battery-uniapp-ui/components/common/abstracts/variable.scss` if new theme vars are needed
- `src/uni_modules/battery-uniapp-ui/global.d.ts`
- `src/subPages/<camelName>/Index.vue`
- `src/pages.json`
- `src/pages/index/Index.vue`
- `docs/component/<name>.md`
- `docs/.vitepress/locales/zh-CN.ts`
- `docs/.vitepress/locales/en-US.ts`
- `src/locale/zh-CN.json` / `src/locale/en-US.json` only if page title or demo text is localized

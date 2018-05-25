# Amped ⚡️

[![CircleCI](https://circleci.com/gh/zioroboco/amped.svg?style=shield&circle-token=5377461df8be62cbc4bc6c9cc43b2dab226dd745)](https://circleci.com/gh/zioroboco/amped)

Amped is a jacked-up development environment for building and deploying front-end components and their supporting serverless infrastructure.

<!-- TOC -->

- [Workspaces](#workspaces)
  - [`@amped/app`](#ampedapp)
  - [`@amped/components`](#ampedcomponents)
  - [`@amped/services`](#ampedservices)
  - [`@amped/types`](#ampedtypes)
- [Package scripts](#package-scripts)
  - [`yarn <workspace> <package-script>`](#yarn-workspace-package-script)
  - [`yarn build-css [--watch]`](#yarn-build-css-watch)
  - [`yarn clean-css`](#yarn-clean-css)
  - [`yarn format`](#yarn-format)
  - [`yarn compile`](#yarn-compile)
  - [`yarn test [--coverage]`](#yarn-test-coverage)
  - [`yarn precommit`](#yarn-precommit)
- [Project config](#project-config)
  - [Typed CSS modules](#typed-css-modules)
  - [Jest](#jest)

<!-- /TOC -->

## Workspaces

[Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) are Yarn's native approach to monorepos. Workspaces are effectively separate NPM packages, but with common dependencies hoisted to the root `node_modules` folder. All interactions between modules are therefore mediated by the NPM package dependency system.

Monorepos allow teams to make atomic commits of related changes spanning multiple projects, while simultaneously enforcing discipline regarding which parts of those projects constitute their public API.

This repository contains the following workspaces:

### `@amped/app`

This workspace is responsible for building and deploying the client-side static Javascript app.

[README](./packages/app/README.md)

### `@amped/components`

This workspace is responsible for providing (and testing!) the UI components used by `@amped/app`.

[README](./packages/components/README.md)

### `@amped/services`

This workspace is responsible for defining and deploying the back-end services which provide data to `@amped/app`.

[README](./packages/services/README.md)

### `@amped/types`

This workspace contains type and interface delarations common to multiple parts of the system.

[README](./packages/types/README.md)

## Package scripts

### `yarn <workspace> <package-script>`

Shortcuts for running package scripts in the specified workspace.

### `yarn build-css [--watch]`

Build type declarations for all CSS modules in the project.

### `yarn clean-css`

Clear and rebuild all CSS module type declarations.

### `yarn format`

Use prettier to format all files not included in `.prettierignore`, automatically writing any changes.

### `yarn compile`

Type-check all workspaces containing Typescript projects.

### `yarn test [--coverage]`

Run tests across all workspaces, with optional coverage reporting.

### `yarn precommit`

Run the complete static analysis and testing pipeline. Should ensure that a branch will pass CI, provided that the working tree is clean.

## Project config

### Typed CSS modules

This project uses CSS modules with programatically generated type declarations. After new CSS classes are defined, the `build-css` script will parse them and generate Typescript types, which can then be imported into components in a type-safe manner. Since the content of these declarations is a function of the CSS modules, only the CSS files themselves are committed to version control.

### Jest

Jest is configured to run tests across all workspaces via the root `jest.config.js`. A base config for workspaces is defined in `jest.workspace.js`, which includes path mappings to the other workspaces. The workspace config file is then imported into the `jest.config.js` files of each workspace, and can be extended there as required.

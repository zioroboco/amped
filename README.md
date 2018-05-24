# Amped ⚡️

Amped is a jacked-up development environment for building and deploying front-end components and their supporting serverless infrastructure.

<!-- TOC -->

- [Workspaces](#workspaces)
  - [`@amped/client`](#ampedclient)
  - [`@amped/components`](#ampedcomponents)
  - [`@amped/services`](#ampedservices)
  - [`@amped/types`](#ampedtypes)
- [Package scripts](#package-scripts)
  - [`yarn compile`](#yarn-compile)
  - [`yarn test [--coverage]`](#yarn-test-coverage)

<!-- /TOC -->

## Workspaces

[Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) are Yarn's native approach to monorepos. Workspaces are effectively separate NPM packages, but with common dependencies hoisted to the root `node_modules` folder. All interactions between modules are therefore mediated by the NPM package dependency system.

Monorepos allow teams to make atomic commits of related changes spanning multiple projects, while simultaneously enforcing discipline regarding which parts of those projects constitute their public API.

This repository contains the following workspaces:

### `@amped/client`

This workspace is responsible for building and deploying the client-side static Javascript app.

[README](./packages/client/README.md)

### `@amped/components`

This workspace is responsible for providing (and testing!) the UI components used by `@amped/client`.

[README](./packages/components/README.md)

### `@amped/services`

This workspace is responsible for defining and deploying the back-end services which provide data to `@amped/client`.

[README](./packages/services/README.md)

### `@amped/types`

This workspace contains type and interface delarations common to multiple parts of the system.

[README](./packages/types/README.md)

## Package scripts

### `yarn compile`

Type-check all workspaces containing Typescript projects.

### `yarn test [--coverage]`

Run tests across all workspaces, with optional coverage reporting.

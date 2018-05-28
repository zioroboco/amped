# Amped ⚡️

[![CircleCI](https://circleci.com/gh/zioroboco/amped.svg?style=shield&circle-token=5377461df8be62cbc4bc6c9cc43b2dab226dd745)](https://circleci.com/gh/zioroboco/amped)

Amped is a jacked-up development environment for building and deploying front-end static javascript apps and their supporting serverless infrastructure.

<!-- TOC -->

- [Setup](#setup)
  - [Installation](#installation)
  - [Development](#development)
  - [Deployment](#deployment)
- [Workspaces](#workspaces)
  - [`@amped/app`](#ampedapp)
  - [`@amped/components`](#ampedcomponents)
  - [`@amped/services`](#ampedservices)
  - [`@amped/types`](#ampedtypes)
- [Package scripts](#package-scripts)
  - [`yarn <workspace> <package-script>`](#yarn-workspace-package-script)
  - [`yarn dev`](#yarn-dev)
  - [`yarn storybook`](#yarn-storybook)
  - [`yarn offline`](#yarn-offline)
  - [`yarn build-css [--watch]`](#yarn-build-css-watch)
  - [`yarn clean-css`](#yarn-clean-css)
  - [`yarn format`](#yarn-format)
  - [`yarn compile`](#yarn-compile)
  - [`yarn test [--coverage]`](#yarn-test-coverage)
  - [`yarn precommit`](#yarn-precommit)
  - [`yarn deploy`](#yarn-deploy)
- [Project config](#project-config)
  - [Environment variables](#environment-variables)
  - [Typed CSS modules](#typed-css-modules)
  - [Jest](#jest)
  - [CI/CD](#cicd)

<!-- /TOC -->

## Setup

### Installation

To build the project, clone the repo, then run `yarn` to install all workspace dependencies and build the required CSS module type declarations.

> **Important:** The `AMPED_API_ENDPOINT` environment variable needs to be defined for the compiled app or webpack-dev-server to access API data. An existing endpoint URI can be found in `.env.example`, and can be copied to a new `.env` file created at the project root.

### Development

Running `yarn dev` will run the app locally in a webpack dev server, or the production app can be built to `packages/app/.build` with `yarn app build`. To run the API offline, run `yarn offline` and then reference the local server in the `AMPED_API_ENDPOINT` environment variable prior to running webpack.

Alternatively, `yarn storybook` will run the storybook server from the `@amped/components` workspace.

### Deployment

To deploy the full stack to AWS, set up appropriate AWS credentials, then define deployment and data S3 buckets and record them in `.env`. Running `yarn deploy` will then build and deploy the application bundle and API service, and begin serving any data uploaded to the designated S3 bucket.

## Workspaces

[Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) are Yarn's native approach to monorepos. Workspaces are effectively separate NPM packages, but with common dependencies linked from the root `node_modules`. All interactions between workspaces are then mediated by package dependencies (i.e. `import { x } from "@amped/workspace"`). Monorepos allow teams to make atomic commits of related changes spanning multiple systems, while simultaneously enforcing discipline regarding which parts of those systems constitute their public API.

This repository contains the following workspaces:

### `@amped/app`

This workspace is responsible for building and deploying the client-side static app and providing data to its components at runtime. It contains the main webpack entry point, the redux store, actions and reducers, and container components for providing store data as props to UI components imported from `@amped/components`.

### `@amped/components`

This workspace is responsible for providing (and testing!) the styled UI components used to construct the application in `@amped/app`, with [Storybook](https://storybook.js.org/) used as a combined UI component development environment and QA/stakeholder-feedback tool. Decoupling components from the situation in which they are used encourages us to reason from their API, and design for the desired (or specified) interface rather than their accidental context.

### `@amped/services`

This workspace is responsible for the back-end services which deploy and provide data to `@amped/app`, as well as deploying the static HTML and javascript bundle to S3. The workspace defines and deploys a complete serverless API endpoint as an AWS CloudFormation stack via Serverless Framework, which responds to requests by fetching specified data files from another S3 bucket (declared in `.env`), then minifying and returning the contents. Any number of files uploaded to this bucket will be available in the application, provided they are indexed in `index.json`.

### `@amped/types`

This workspace contains type and interface declarations common to multiple parts of the system, to prevent circular dependencies and questions of where common types should be declared. It contains no executable code.

## Package scripts

### `yarn <workspace> <package-script>`

Shortcuts for running package scripts in the specified workspace.

For example: `yarn app add react` will install `react` in `@amped/app`.

### `yarn dev`

Shortcut for `yarn app dev`, which will run webpack dev server in the `@amped/app` workspace.

### `yarn storybook`

Shortcut for `yarn components storybook`, which will run the storybook server in the `@amped/components` workspace.

### `yarn offline`

Shortcut for `yarn services offline`, which runs an offline instance of the API defined in the `@amped/services` workspace.

### `yarn build-css [--watch]`

Build type declarations for all CSS modules in the project.

### `yarn clean-css`

Clear and rebuild all CSS module type declarations.

### `yarn format`

Use Prettier to format all files not included in `.prettierignore`, automatically writing any changes to disk (careful!).

### `yarn compile`

Type-check all workspaces containing Typescript projects.

### `yarn test [--coverage]`

Run tests across all workspaces, with optional coverage reporting.

### `yarn precommit`

Run the complete static analysis and testing pipeline. Should ensure that a branch will pass CI, provided that the working tree is clean.

### `yarn deploy`

Build and deploy the static app to S3 and the API to AWS CloudFormation. Alternatively, `yarn services deploy-api` will deploy the API only.

## Project config

### Environment variables

This project requires a number of environment variables to be configured, either in the execution environment or in a `.env` file at the project root (see `.env.example` for specific variable names). For building the application, only `AMPED_API_ENDPOINT` needs to be defined (a maintained production endpoint is included in the example file), but for deployment, AWS credentials and two S3 buckets for API data and the static site deployment need to be defined.

### Typed CSS modules

This project uses CSS modules with programatically generated type declarations. After new CSS classes are defined, the `build-css` script will parse them and generate Typescript types, which can then be imported into components in a type-safe manner. Since the content of these declarations is a function of the CSS modules, only the CSS files themselves are committed to version control.

### Jest

Jest is configured to run tests across all workspaces via the root `jest.config.js`. A base config for workspaces is defined in `jest.workspace.js`, which includes path mappings to the other workspaces. The workspace config file is then imported into the `jest.config.js` files of each workspace, and can be extended there as required.

### CI/CD

The repo at https://github.com/zioroboco/amped is being built, tested and deployed on all commits to master by CircleCI, with config in `.circleci/config.yml`. This is running the full suite of style- and type-checking and unit tests, before deploying the static application bundle to S3 and the API service to AWS CloudFormation.

Note that building and deploying in CI requires all environment variables in `.env` to be configured in CI environment (see `.env.example` for the list of expected values).

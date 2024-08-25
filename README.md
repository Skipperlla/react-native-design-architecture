# React Native Design Architecture Boilerplate

This project is a React Native boilerplate with some extra features pre-configured. It also uses [TypeScript](https://www.typescriptlang.org/) as the primary language. Added features that are useful for most of the projects

## Index
- [React Native Design Architecture Boilerplate](#react-native-design-architecture-boilerplate)
  - [Index](#index)
  - [Environment Variables](#environment-variables)

## Environment Variables

You can create an `.env` file in the root directory of the project. The contents of this file should be the same as the `.env.example` file. You can change the values of the variables in this file. These variables in the project can be accessed with the syntax `import { VARIABLE_NAME } from "@env"`.

We can using [react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv) package for this.

List of the variables:

- `API_URL`: The base URL of the API. This is also used when calling `api`. This is a required variable.

- `APP_STORE_URL`: The URL of the app in the App Store. It is used in the `useControlAppVersion` hook. This is a required variable.

- `PLAY_STORE_URL`: The URL of the app in the Play Store. It is used in the `useControlAppVersion` hook. This is a required variable.

# React Native Design Architecture Boilerplate

This project is a React Native Design Architecture Boilerplate with some extra features pre-configured. It also uses [TypeScript](https://www.typescriptlang.org/) as the primary language. Added features that are useful for most of the projects

- [React Native Design Architecture Boilerplate](#react-native-design-architecture-boilerplate)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Folder Structure](#folder-structure)
  - [EAS Configuration](#eas-configuration)
  - [Firebase Configuration](#firebase-configuration)
      - [Android](#android)
      - [iOS](#ios)
  - [Features](#features)
      - [Navigation](#navigation)
      - [Push Notifications](#push-notifications)
      - [Authentication Structure](#authentication-structure)
      - [Internationalization](#internationalization)
      - [Analytics](#analytics)
      - [Crashlytics](#crashlytics)
      - [Force Update Mechanism](#force-update-mechanism)
      - [Adding a New Font](#adding-a-new-font)
      - [Splash Screen Customizations](#splash-screen-customizations)
      - [Remote Configuration](#remote-configuration)
      - [On The Fly Update](#on-the-fly-update)
      - [useAnalytics](#useanalytics)
      - [useAppState](#useappstate)
        - [**Parameters**](#parameters)
        - [**Example Usage**](#example-usage)
      - [**Using Icons in Your App with SVGR**](#using-icons-in-your-app-with-svgr)
        - [**Prepare Your Icons**](#prepare-your-icons)
        - [**Usage Example**](#usage-example)
      - [Deep Linking](#deep-linking)
        - [**Testing deep links**](#testing-deep-links)
      - [Theming and Localization](#theming-and-localization)
        - [**Dynamic Theming**](#dynamic-theming)
        - [**Localization**](#localization)
        - [**Example: Manually Changing Theme and Language**](#example-manually-changing-theme-and-language)
      - [Understanding package.json scripts](#understanding-packagejson-scripts)
        - [**Linting and Type Checking**](#linting-and-type-checking)
        - [**Code Formatting**](#code-formatting)
        - [**Building for iOS and Android**](#building-for-ios-and-android)
        - [**Cleaning and Deployment**](#cleaning-and-deployment)
        - [**Testing with Maestro**](#testing-with-maestro)
      - [Custom Bottom Sheet with @gorhom/bottom-sheet](#custom-bottom-sheet-with-gorhombottom-sheet)
        - [Overview](#overview)
        - [`AppModal`](#appmodal)
        - [`present(id: string)`](#presentid-string)
        - [`dismiss()`](#dismiss)
        - [`PORTAL_ID`](#portal_id)
        - [Example Usage](#example-usage-1)
      - [Maestro End-to-End Testing](#maestro-end-to-end-testing)
      - [Third-Party Libraries and Dependencies](#third-party-libraries-and-dependencies)
        - [**1. Pre-commit and Commit Message Checks**](#1-pre-commit-and-commit-message-checks)
        - [**2. Commitlint and Prettier Settings**](#2-commitlint-and-prettier-settings)
        - [**3. ESLint Configuration**](#3-eslint-configuration)
        - [**4. EditorConfig Settings**](#4-editorconfig-settings)
      - [Custom Hooks](#custom-hooks)
        - [**useHapticFeedBack**](#usehapticfeedback)
        - [**useImagePicker**](#useimagepicker)
        - [**useMediaPicker**](#usemediapicker)
        - [**useCameraRoll**](#usecameraroll)
        - [**useGeolocation**](#usegeolocation)
      - [CI/CD pipeline](#cicd-pipeline)
        - [**EAS Preview**](#eas-preview)
        - [**Continuous Integration (CI) Workflow**](#continuous-integration-ci-workflow)
  - [Why Choose MMKV for Key/Value Storage in React Native?](#why-choose-mmkv-for-keyvalue-storage-in-react-native)
    - [Performance Benchmark](#performance-benchmark)
    - [Key Advantages of MMKV](#key-advantages-of-mmkv)

## Getting Started

### Prerequisites

Ensure you have followed the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup).

### Installation

1. **Create New Repo**: On GitHub, create a new repository and select `react-native-design-architecture-boilerplate` as the template.
2. **Clone Repo**: Clone your new repository.

```sh
  git clone https://github.com/your-username/your-repo-name.git
  cd your-repo-name
```

3. **Install Dependencies:**: Run `yarn install` to install the project dependencies.

```sh
  yarn install
```

4. **Run the Project:**: Run `yarn start` to start the project.

```sh
  yarn start
```

## Environment Variables

You can create an `.env` file in the root directory of the project. The contents of this file should be the same as the `.env.example` file. You can change the values of the variables in this file. These variables in the project can be accessed with the syntax `import { VARIABLE_NAME } from "@env"`.

> if you want to type your newly added variable, you can add the variable name you just added to the `types/env.d.ts` file.

We can using [react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv) package for this.

List of the variables:

- `API_URL`: The base URL of the API. This is also used when calling `api`. This is a required variable.

- `APP_STORE_URL`: The URL of the app in the App Store. It is used in the `useControlAppVersion` hook. This is a required variable.

- `PLAY_STORE_URL`: The URL of the app in the Play Store. It is used in the `useControlAppVersion` hook. This is a required variable.

## Folder Structure

```

├── .maestro/
├── credentials/
├── src/
│ ├── api/
│ ├── assets/
│ │ ├── images/
│ │ ├── fonts/
│ ├── components/
│ ├── constants/
│ ├── context/
│ ├── hooks/
│ │ ├── api/
│ ├── lang/
│ ├── navigation/
│ ├── screens/
│ ├── store/
│ ├── types/
│ ├── utils/
├── App.tsx

```

Explanation of the folders:

- `.maestro`: This folder is for tests. For React Native, we recommend using [Maestro](https://maestro.mobile.dev) as it simplifies UI testing and makes it easier to automate and validate user interactions.
- `credentials`: This folder is for the credentials of the app. Boilerplate is using this folder for the credentials that are used in the whole app. You can find more examples in the `credentials` folder.
- `src`: This folder is for the source code of the app.
  - `assets`: This folder is for the assets of the app. Generally, boilerplate is using this folder for images, locale files, and other types of assets.
    - `images`: This folder is for the images of the app. Boilerplate is using this folder for the images that are used in the whole app. You can import them from the `@app/assets/images` folder.
    - `fonts`: This folder is for the fonts of the app. Boilerplate is using this folder for the fonts that are used in the whole app. You can import them from the `@app/assets/fonts` folder.
  - `components`: This folder is for the components of the app. Boilerplate is using this folder for the components that are used in the whole app. For using the components, export them in the `src/components/index.ts` file and then you can import them from the `@app/components` folder.
  - `constants`: This folder is for the constants of the app. Boilerplate is using this folder for the constants that are used in the whole app. When constant using by more than one file, you need to create a file for the constant in this folder. Constants are exporting in the object format. And names and keys of the constants are in the `PascalCase` format. And should be export in the `src/constant/index.ts` file. You can import them from the `@app/constants` folder.
  - `context`:This folder is for managing global state using the React Context API. Boilerplate uses this folder to store and manage context providers that handle global state across the app. You can create different context files for various state management needs. You can import them from the `@app/context` folder.
  - `hooks`: This folder is for the hooks of the app. Boilerplate is using this folder for custom hooks. Hooks are have to be in the `use` prefix. And should be export in the `src/hooks/index.ts` file. You can import them from the `@app/hooks` folder.
    - `api`: This folder is for the hooks that are using the API. Boilerplate using hooks for all API calls. And this API hooks using `react-query` package. You can find more examples in the `src/hooks/api` folder. And using examples in the `src/screens/Login/index.tsx` and `src/screens/Home/index.tsx` files.
  - `lang`: This folder is for managing the language and localization files of the app. Boilerplate uses this folder to store language files and manage localization settings. You can import the language files from the `@app/lang` folder.
  - `lib`: This folder is for the libraries of the app. Boilerplate is using this folder for the libraries that are used in the whole app. When functions using by more than one file, you need to create a file for the library in this folder. Libraries should be export in the `src/lib/index.ts` file. You can import them from the `@app/lib` folder.
  - `navigation`: This folder is for the navigation of the app. Boilerplate using [React Navigation](https://reactnavigation.org) for navigating the app. You can find more examples in the `src/navigation` folder.
  - `screens`: This folder is for the views of the app. This folder has screens of the app. All parts of every screen are combined under this folder and turned proper user interface here. This folder generally has flows, components, and API calls. You can find more examples in the `src/screens` folder.
  - `store` This folder is for state management and storage in the app. Boilerplate uses [zustand](https://zustand-demo.pmnd.rs/) for managing the app's state and [mmkv](https://github.com/mrousavy/react-native-mmkv?tab=readme-ov-file) for storage purposes. State and storage logic should be organized within this folder, making it easier to manage and scale the app's state. You can import them from the `@app/store` folder.
  - `types`: This folder is for TypeScript types used throughout the app. Boilerplate uses this folder to define and organize TypeScript types, ensuring that types are consistent and easy to maintain. Types should be organized by feature or module and can be imported from the `@app/types` folder.
  - `utils`: This folder is for utility functions used in the app. Boilerplate uses this folder for functions that provide common functionality and are used across multiple files. Utility functions should be organized logically within this folder and can be imported from the `@app/utils` folder.
- `App.tsx`: This file is the main file of the app. Boilerplate is using this file for configuring the app and context providers. You can find more examples in the `src/App.tsx` file.

## EAS Configuration

After you create your project, go and change the package names in the `app.json` file, both for iOS and Android respectively. You can find more information about this in the [documentation](https://docs.expo.dev/build-reference/).

Because we have already have native dependencies from start, the app can not work with Expo Go, thus we need a development build to work with it.

We have already have a development profile for this. You can find it in the `eas.json` file.

Run the following command to build the app for development. Follow the instructions

```bash
eas build --profile development
```

Once the build is complete, you can find the `.apk` and `.ipa` files in the main directory. You can find more information about this in [documentation](https://docs.expo.dev/build-reference/).

Remove comments from the `eas-preview.yml` file and make it active.

You'll need a secret named `EXPO_TOKEN`, you can find more information about this in the [documentation](https://docs.expo.dev/eas-update/github-actions/).

Then you can use the `eas-preview` workflow to test the app.

## Firebase Configuration

Boilerplate use the [React Native Firebase](https://rnfirebase.io/) package for Firebase. To use it, you need to add your Firebase configuration.

#### Android

You need to replace your `google-services.json` file inside the `credentials` folder.

#### iOS

You need to replace your `GoogleService-Info.plist` file inside the `credentials` folder.

## Features

#### Navigation

React Navigation allows you to navigate between screens in your app. In this example, a navigation reference is created using `createNavigationContainerRef`, and this reference is used to navigate between screens.

**Updating PAGES file**

every time a new page is added, it should be added to `src/constants/pages` and called that everywhere

**Usage Example**

```typescript
import { useAppNavigation } from '@app/hooks';

const navigation = useAppNavigation();
navigation.navigate(PAGES.EDITOR);
```

In this example, the user is navigated to the `PAGES.EDITOR` screen with the `imageUrl` and `id` parameters.

**Updating RootStackParamList**

Whenever you add a new screen, make sure to update the `RootStackParamList` with the appropriate key and value types for that screen. This ensures type safety in navigation operations.

```typescript
type RootStackParamList = {
  [PAGE_NAME]: PAGE_PARAMS;
  //* Example
  [PAGES.EDITOR]: undefined | { imageUri: string };
};
```

> The name of the page should be given as `key` for `value`, if the page takes parameters, the parameters should be entered, if it does not take any parameters, undefined can be given.

---

#### Push Notifications

**1.Requesting Push Notification Permission**

The first step to using push notifications with Expo is to request permission from the device, i.e., the user. You can do this by using the `registerForPushNotificationsAsync` function in the `src/hooks/usePushNotification.ts` file.

**2.Setting Up Push Notifications with Expo**

Since we're using Expo, there's not much configuration needed for push notifications. Instead, a simple setup is required as outlined on Expo's official site. Before you start the setup, make sure you're logged in with `eas login`. After logging into EAS, follow the steps [here](https://docs.expo.dev/push-notifications/push-notifications-setup/#get-credentials-for-development-builds) to upload the required files to the EAS panel.

**3.Testing**

Once you've completed all these steps, you can send test notifications to your devices using the [Notification Tool](https://expo.dev/notifications).

---

#### Authentication Structure

This configuration is based on two main states within `useAuthStore`: `isLoggedIn` and `user`. `isLoggedIn` determines whether the user is logged in, while `user` holds the user's credentials. These two states are used throughout the application to manage user sessions and control page navigation.

**1. Storing Credentials**

When a user logs in, their credentials and session status are saved. This process typically occurs after the user successfully logs in. The response data from the login process is stored as user credentials, and the session status is updated. This information is necessary for displaying user-specific content throughout the application.

**2. Page Navigation and Screen Display**

The user's session status determines which pages are displayed. The application shows two types of page groups based on the login status:

- **Pages Accessible Without Logging In**: If `isLoggedIn` is `false`, the user is only shown pages that can be accessed without logging in. These pages typically include login, registration, or general information pages.

- **Pages Accessible After Logging In**: If `isLoggedIn` is `true`, the user is shown pages that are only accessible after logging in. These pages offer user-specific content and functionality.

**3. Removing Credentials**

When a user wishes to log out, the session information is cleared, and the session status is reset. This process typically occurs when the user logs out. Once the session information is removed, all states are reset. This ensures that the user logs out securely and the application returns to its initial state.

**4. Summary**

- **State Management**: `useAuthStore` manages the `isLoggedIn` and `user` states and makes this data available throughout the application.
- **Routing**: The application's routing logic ensures that different pages are displayed based on the `isLoggedIn` state. More information `src/navigation/index.tsx`
- **Session Management**: User credentials and session status are updated or reset during login and logout processes.

This structure securely manages user sessions and optimizes the user experience based on the session status.

---

#### Internationalization

The internationalization structure is built on the `useTranslation` hook and this structure is using the `i18n-js` package in the background. And in this approach, we are using the locale files in the `src/lang` folder and those files are in the `JSON` format. We have have two steps for using internationalization.

**1. Adding the locale files**

You need to add the locale files to the `src/lang` folder. The file name should be in the `en.json` format. You can find an example in the `src/lang/en.json` file. And these JSON files should be the `key-value` structure the same as a folder structure.
And we have a couple of key groups for components. These groups are:

- `labels`: This group is for the texts, descriptions, messages and titles of the components.
- `actions`: This group is for the buttons, links and other actions of the components.

**2. Using the localization in components**

You can use localization in components with the `useTranslation` hook. This hook has a function `t` and this function is to get the localized text. And this function has three parameters. The first one is the `key` of the text, the second one is the `scope` of the text and the last one is `options` and this parameter usually has scope and variables. You can find an example in `src/screens/Login/index.tsx`.

---

#### Analytics

Boilerplate uses the [Firebase Analytics](https://rnfirebase.io/analytics/usage) service for analytics. In `src/App.tsx` we added a flow to track screen changes.

The React Native Firebase package is also predefined for the project. To use Firebase you need to configure it. You can find instructions in [Firebase Configuration](#firebase-configuration).

---

#### Crashlytics

Boilerplate uses the Firebase Crashlytics service for tracking the crashes. It is default initialized you don't need to do anything for using it. Boilerplate is also sending user data with crash reports. Logged in user defining an in the `src/components/Initializing.tsx` file. You can be needed to change the user data for your project.

React Native Firebase package is also predefined for the project. To use Firebase, you need the configure it. You can find instructions in the Firebase Configuration section.

---

#### Force Update Mechanism

Force update is an important part of the boilerplate. Because most users don't update their apps besides, apps generally crash when changing API or don't use new features. So we need to force update feature for our apps.

So, boilerplate has `useControlAppVersion.ts` hook for this. This hook compares the app version and minimum app version provided by [Firebase Remote Config](https://rnfirebase.io/remote-config/usage). If the app version is smaller than Remote Config version, the app shows a native alert to the user. This modal only has one button. This button redirects the user to the app's store page. Store page URL is provided in `.env` file with `APP_STORE_URL` and `PLAY_STORE_URL` variables.

This hook is working when the app is opening every time.

---

#### Adding a New Font

If you want to add a new font to your application, the steps are quite simple:

1. Add the font file to the `src/assets/fonts` directory.
2. Add the name of the newly added font to the `useFonts` function in `App.tsx`. For example:
   ```typescript
   "Urbanist-Bold": require("@app/assets/fonts/Urbanist-Bold.ttf")
   ```
3. After that, you don't need to do anything extra.

---

#### Splash Screen Customizations

If you want to change the splash screen's color, `resizeMode`, or `backgroundColor`, you can do this through the `app.json` file.

**1. Modifying Splash Screen Properties**

1. Open the `app.json` file.
2. Adjust the properties under the `splash` object according to your needs.

**2. For More Information**

If you want to learn more about splash screen customization, you can use the following links:

- [Expo Splash Screen](https://docs.expo.dev/versions/latest/config/app/#splash)
- [Android Splash Screen](https://docs.expo.dev/versions/latest/config/app/#splash-2)
- [iOS Splash Screen](https://docs.expo.dev/versions/latest/config/app/#splash-1)

---

#### Remote Configuration

You can change some variables in the app with [Firebase Remote Config](https://rnfirebase.io/remote-config/usage). Boilerplate has a predefined `useRemoteConfig.ts` hook for this. You can find the variables in the `src/constants/remoteConfigKeys.ts` file. You can change the variables in this file.

---

#### On The Fly Update

This is the most important feature of the boilerplate. Because sometimes we need to send an immediate update to the app. But store updates mostly take a minimum one day. We are using this feature for updating the app without publishing the app to the store. We are using [Expo Updates](https://docs.expo.dev/versions/latest/sdk/updates/) package for this.

> Please remember to update the `username` under the `expo-updates` section in the `app.json` file with your organization's username.

---

#### useAnalytics

This **`logEvent`** function is purposed to log an event to Amplitude. It takes three parameters:

- **`screenName`**: This specifies the name of the screen where the event is logged.
- **`elementName`**: This specifies the name of the relevant element in the UI (e.g., a button, a link, etc.)
- **`action`**: This specifies the action taken (e.g., click, view).
- **`elementType`**: This specifies the type of the UI element (e.g., button, image).
- **`options`**: This specifies the options for the event (e.g., the user's ID).

Example Usage:

```tsx
const logEvent = useAnalytics(screenName);
logEvent('Created_Artwork', 'create', 'Artwork', {
  style: 'Background Remover',
});
```

> .env.example folder is `AMPLITUDE_API_KEY` value. Don't forget to fill these values.

---

#### useAppState

This **`useAppState`** hook is designed to track the current state of the application (active, inactive, or background) in a React Native application. The hook allows you to execute specific functions when the app state changes, making it particularly useful for performing actions or cleanup when the app goes to the background or comes to the foreground.

##### **Parameters**

The hook accepts a **`settings`** object with optional callback functions that are executed based on the app state transitions:

- **`onChange`**: Called whenever the app state changes, with the new state as a parameter.
- **`onForeground`**: Called when the app transitions to the foreground (active state).
- **`onBackground`**: Called when the app transitions to the background.

##### **Example Usage**

Here’s how you might use this hook in a component to track app state transitions:

```tsx
import React from 'react';
import { View } from 'react-native';

import { useAppState } from '@app/hooks';

const AppStatusComponent = () => {
  const appState = useAppState({
    onForeground: () => console.log('App has come to the foreground'),
    onBackground: () => console.log('App has gone to the background'),
    onChange: (state) => console.log('App State changed to', state),
  });

  return <View></View>;
};

export default AppStatusComponent;
```

In this example, the **`useAppState`** hook is used with custom callbacks to log the state transitions to the console. The current app state is also displayed on the screen using a **`Text`** component.

---

#### **Using Icons in Your App with SVGR**

##### **Prepare Your Icons**

To add new SVGs to your project, follow these steps:

1. Visit the [SVGPS collection page](https://svgps.app/collection).
2. Drag and drop the SVGs you want to add into the collection area.
3. Export the collection as a JSON file.
4. Add the exported JSON file to your project in the `src/assets/icons.json` directory.

This ensures all your icons are properly managed and organized.

##### **Usage Example**

To integrate an icon into your app, use the following method:

```tsx
import { Icon } from '@app/components';

const Index = () => {
  return <Icon icon="image_outline" size={24} color="red" />;
};

export default Index;
```

---

#### Deep Linking

First, you will want to specify a URL scheme for your app. This corresponds to the string before :// in a URL, so if your scheme is mychat then a link to your app would be mychat://. You can register for a scheme in your app.json by adding a string under the scheme key:

- Add this change in `app.json`

```json
{
  "expo": {
    "scheme": "mychat"
  }
}
```

##### **Testing deep links**

> npx uri-scheme open [your deep link] --[ios|android]

For example, if you want to test the deep link `mychat://chat/123`, you would run:

**IOS**

```bash
npx uri-scheme open mychat://chat/123 --ios
```

**Android**

```bash
npx uri-scheme open mychat://chat/123 --android
```

---

#### Theming and Localization

##### **Dynamic Theming**

By default, the application’s theme is set based on the system’s current color scheme (dark or light). The `isDarkMode` and `defaultTheme` states in `useAppStore` are initialized using `Appearance.getColorScheme()` to reflect this.

However, if you want users to manually select their preferred theme (e.g., dark or light), you can use the `setTheme` function provided by `useAppStore`. This allows you to override the automatic theme setting and apply the user's choice.

##### **Localization**

Similarly, you can manage localization by allowing users to select their preferred language through the `setLanguage` function from `useAppStore`. This function enables dynamic changes to the app's language based on user input.

##### **Example: Manually Changing Theme and Language**

Here’s an example that demonstrates how you can use both `setTheme` and `setLanguage` in your application:

```typescript
import { Button, View } from "react-native";
import { useAppStore } from "@app/store";

export default function SettingsScreen() {
  const { setTheme, setLanguage } = useAppStore();

  return (
    <View>
      <Button title="Switch to Dark Mode" onPress={() => setTheme("dark")} />
      <Button title="Switch to Light Mode" onPress={() => setTheme("light")} />
      <Button title="Switch to English" onPress={() => setLanguage("en")} />
      <Button title="Switch to Spanish" onPress={() => setLanguage("es")} />
    </View>
  );
}
```

---

#### Understanding package.json scripts

##### **Linting and Type Checking**

- **check:lint**: `eslint \"**/*.{js,ts,tsx}\"`

  - Runs the linter across all files in the project to check for code style and formatting issues.

- **check:types**: `tsc`

  - Checks for type errors in TypeScript files without emitting any compiled output.

- **check**: `npm run check:lint && npm run check:types`
  - Runs both the `check:lint` and `check:types` scripts to ensure the code passes both linting and type checking.

##### **Code Formatting**

- **lint**: `eslint --fix`

  - Automatically fixes linting errors in the code.

- **prettier**: `prettier --write`
  - Formats the project's files using Prettier, ensuring they conform to the project's code style.

##### **Building for iOS and Android**

- **build:dev:ios**: `eas build --platform ios --profile development --non-interactive --local`

  - Builds the iOS app locally using the development profile.

- **build:prod:ios**: `eas build --platform ios --profile production --non-interactive --local`

  - Builds the iOS app locally using the production profile.

- **build:dev:android**: `eas build -p android --profile development --non-interactive --local`

  - Builds the Android app locally using the development profile.

- **build:prod:android**: `eas build -p android --profile production --non-interactive --local`

  - Builds the Android app locally using the production profile.

- **build:dev:both**: `yarn build:dev:ios && yarn build:dev:android`

  - Builds both iOS and Android apps locally using the development profiles.

- **build:prod:both**: `yarn build:prod:ios && yarn build:prod:android`
  - Builds both iOS and Android apps locally using the production profiles.

##### **Cleaning and Deployment**

- **clean:folders**: `rm -rf android ios`

  - Deletes the `android` and `ios` folders, typically used before rebuilding or resetting the project.

- **submit:ios**: `eas submit -p ios`

  - Submits the iOS build to the App Store.
  - Please remember to fill in the required credentials under the `submit > production > ios` section in the eas.json file.

- **submit:android**: `eas submit -p android`
  - Submits the Android build to the Google Play Store.

##### **Testing with Maestro**

- **test:e2e**: `maestro test ./path`
  - Runs end-to-end tests using Maestro.
- **test:maestro:all**: `maestro test .maestro`
  - Runs all tests at once using Maestro.

---

#### Custom Bottom Sheet with @gorhom/bottom-sheet

##### Overview

This document provides a brief explanation of the `AppModal` component and its usage in a React Native application. The example demonstrates how to use the `present` and `dismiss` functions to control the visibility of a modal, which is associated with an `AppModal`.

##### `AppModal`

`AppModal` is a component that serves as a container for rendering the modal content. It links the modal's UI to a specific ID, enabling it to be controlled via `present` and `dismiss` functions.

##### `present(id: string)`

The `present` function is used to display the modal. It takes an `id` as an argument, which corresponds to the ID of the `AppModal`. This ID ensures that the correct modal is presented when multiple modals are used in an application.

##### `dismiss()`

The `dismiss` function hides the currently presented modal. It can be called without any arguments as it will automatically close the modal that is currently open.

##### `PORTAL_ID`

`PORTAL_ID` is a constant string that uniquely identifies the `AppModal` instance. It links the `present` and `dismiss` functions to the specific modal that needs to be controlled.

##### Example Usage

```typescript
const { dismiss, present } = useAppModal();
const PORTAL_ID = 'BackgroundRemoverImagePicker';

const App = () => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          present(PORTAL_ID);
        }}
      >
        <Text>Open</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={dismiss}>
        <Text>Close</Text>
      </TouchableOpacity>
      <AppModal id={PORTAL_ID}>
        <View />
      </AppModal>
    </>
  );
};
```

---

#### Maestro End-to-End Testing

You can E2E test your app with [Maestro](https://maestro.mobile.dev/)

We have a sample Home test in `.maestro/flows/home/login_test.yaml`

Whenever you add a new e2e test category run this command:

```
yarn test:maestro:all
```

> this command runs all tests at the same time

Then you can add your E2E test flows to `.maestro/flows/YOUR_NEW_SCREEN` folder.

If you want to run only one test, you can use this command:

```
yarn test:maestro `PATH`
```

---

#### Third-Party Libraries and Dependencies

##### **1. Pre-commit and Commit Message Checks**

This configuration defines the commands to run during the `pre-commit` and `commit-msg` stages:

- **Pre-commit:**

  - **Lint Checks:** Runs `eslint` on files with extensions `*.js, *.ts, *.jsx, *.tsx` to ensure code quality.
  - **Type Checks:** Runs `tsc --noEmit` on TypeScript files to check for type errors.

- **Commit Message Checks:**
  - **Commitlint:** Ensures commit messages follow a specific convention using `npx commitlint --edit`.

##### **2. Commitlint and Prettier Settings**

- **Commitlint:**

  - Ensures that commit messages conform to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.

- **Prettier:**
  - A code formatting tool that enforces the following rules:
    - **Quote Style:** Uses single quotes.
    - **Tab Width:** Tabs are set to 2 spaces wide.
    - **Trailing Comma:** Adds a trailing comma after the last element.
    - **Arrow Function Parentheses:** Always uses parentheses around arrow function parameters.
    - **End of Line:** Automatically determined.
    - **Semicolons:** Always uses semicolons.
    - **Bracket Spacing:** Spaces are added between brackets.
    - **JSX Brackets:** The closing bracket of JSX elements is not placed on the same line as the last prop.

##### **3. ESLint Configuration**

ESLint is a tool for ensuring that your JavaScript and TypeScript code adheres to certain rules. This configuration is based on `@callstack` standards:

- **Environment Settings:** Supports ES2022 and Node.js environments.
- **Custom Rules:**
  - Disables inline styles.
  - Adjusts various settings for React and import statements.
  - Supports JSX and TSX file extensions.
  - Alphabetizes import order and customizes specific import groups.

##### **4. EditorConfig Settings**

EditorConfig helps maintain consistent coding styles across different editors and IDEs:

- **Indent Style:** Uses spaces.
- **Indent Size:** Set to 2 spaces.
- **End of Line Character:** Uses `lf` (Line Feed).
- **Character Set:** `utf-8`.
- **Trim Trailing Whitespace:** Removes unnecessary whitespace at the end of lines.
- **Insert Final Newline:** Ensures a newline is added at the end of the file.

---

#### Custom Hooks

##### **useHapticFeedBack**

`useHapticFeedback` is a hook that triggers haptic feedback using Expo Haptics.

**Usage**

```javascript
import { useHapticFeedback } from '@app/hooks';

const onHapticFeedback = useHapticFeedback();

onHapticFeedback('light'); // Triggers a light haptic feedback
```

For more details, check out the [gist here](https://gist.github.com/Skipperlla/36b9991768c99e3afceb363b382e0671)

##### **useImagePicker**

`useImagePicker` is a hook that simplifies the process of picking images from the user's library or capturing photos using the camera. It handles permission requests and provides functions for both image picking and camera usage.

**Usage**

```javascript
import { useImagePicker } from '@app/hooks';

const { onImagePicker, onCamera } = useImagePicker();

// Example usage
const image = await onImagePicker(); // Opens image library
const photo = await onCamera(); // Opens camera to take a photo
```

For more details, check out the [gist here](https://gist.github.com/Skipperlla/b8c119d9d95ac0205420fcdfdd777293)

---

##### **useMediaPicker**

`useMediaPicker` is a hook that helps in fetching the recent photos from the user's media library. It handles permission checks and automatically updates the assets whenever new media is added to the library.

**Usage**

```javascript
import useMediaPicker from '@app/hooks';

const { onMediaLibrary } = useMediaPicker();

// Example usage
await onMediaLibrary(); // Fetches the most recent 20 photos from the media library
```

For more details, check out the [gist here](https://gist.github.com/Skipperlla/418ec3ae546368f8b9956f9613967a84)

---

##### **useCameraRoll**

`useCameraRoll` is a hook that provides functions to save images to the device's media library, either directly from a URL or from a base64 string. It also includes a utility to convert an image URL to a base64 string.

**Usage**

```javascript
import useCameraRoll from '@app/hooks';

const { saveImageToLibrary, saveAssetFromWatermark, imageToBase64 } =
  useCameraRoll();

// Example usage
await saveImageToLibrary('https://example.com/image.jpg'); // Saves image to the media library
const base64Image = await imageToBase64('https://example.com/image.jpg'); // Converts image to base64
```

For more details, check out the [gist here](https://gist.github.com/Skipperlla/22718ac41ad1b0045f6d87e2443cd9a2)

---

##### **useGeolocation**

`useGeolocation` is a hook that retrieves the user's current location using Expo's Location API. It handles permission checks for foreground location access.

**Usage**

```javascript
import useGeolocation from './path-to-hook/useGeolocation';

const { onForeground } = useGeolocation();

// Example usage
const location = await onForeground(); // Retrieves the user's current location
```

For more details, check out the [gist here](https://gist.github.com/Skipperlla/67d2cdd666e491a4e8ef0eaa40246497)

---

#### CI/CD pipeline

##### **EAS Preview**

This GitHub Actions workflow automatically creates a "Preview" version of your app using Expo Application Services (EAS) whenever a pull request is opened or updated. The workflow checks for necessary permissions, sets up Node.js and EAS tools, installs dependencies, and runs eas update --auto to generate the preview build.

For more details, you can refer to the .github/workflows/eas-preview.yml file.

##### **Continuous Integration (CI) Workflow**

This GitHub Actions workflow runs linting and type checking on your codebase whenever there is a push to the `main` branch, a pull request to the `main` branch, or when a merge group requests checks.

For more details, you can refer to the `.github/workflows/ci.yml` file.

---

## Why Choose MMKV for Key/Value Storage in React Native?

When selecting a key/value storage solution for React Native, performance is a crucial factor. MMKV stands out as an excellent choice due to its speed and efficiency, especially when compared to other popular storage solutions.

### Performance Benchmark

The image below illustrates a benchmark that measures the time it takes to read a value from storage 1000 times across various storage libraries in React Native:

![React Native Storage Benchmark](https://github.com/mrousavy/StorageBenchmark/blob/main/img/graph.png?raw=true)

As demonstrated, MMKV significantly outperforms other storage libraries, including AsyncStorage, SQLite, and RealmDB. This performance advantage makes MMKV an ideal choice for applications that require fast data access and smooth user experiences.

### Key Advantages of MMKV

- **Speed**: MMKV is optimized for performance, allowing for lightning-fast read and write operations. This is particularly important for apps with high data throughput requirements.
- **Efficiency**: MMKV is memory-efficient, which helps in reducing the app's overall memory footprint while maintaining high-speed access to stored data.
- **Reliability**: Built on top of Facebook's MMKV library, it has been battle-tested in production environments, ensuring reliability and robustness.

Given these advantages, MMKV is highly recommended for React Native projects that prioritize performance and efficiency in their data storage strategy.

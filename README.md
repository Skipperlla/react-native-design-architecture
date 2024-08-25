# React Native Design Architecture Boilerplate

This project is a React Native boilerplate with some extra features pre-configured. It also uses [TypeScript](https://www.typescriptlang.org/) as the primary language. Added features that are useful for most of the projects

## Index

- [React Native Design Architecture Boilerplate](#react-native-design-architecture-boilerplate)
  - [Index](#index)
  - [Environment Variables](#environment-variables)
  - [Folder Structure](#folder-structure)
  - [Firebase Configuration](#firebase-configuration)
      - [Android](#android)
      - [iOS](#ios)
  - [Features](#features)
      - [Navigation](#navigation)
      - [Push Notifications](#push-notifications)
      - [Authentication Structure](#authentication-structure)
      - [Internationalization](#internationalization)

## Environment Variables

You can create an `.env` file in the root directory of the project. The contents of this file should be the same as the `.env.example` file. You can change the values of the variables in this file. These variables in the project can be accessed with the syntax `import { VARIABLE_NAME } from "@env"`.

We can using [react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv) package for this.

List of the variables:

- `API_URL`: The base URL of the API. This is also used when calling `api`. This is a required variable.

- `APP_STORE_URL`: The URL of the app in the App Store. It is used in the `useControlAppVersion` hook. This is a required variable.

- `PLAY_STORE_URL`: The URL of the app in the Play Store. It is used in the `useControlAppVersion` hook. This is a required variable.

## Folder Structure

```
├── __tests__/
├── android/
├── ios/
├── src/
│   ├── api/
│   ├── assets/
│   │   ├── images/
│   │   ├── fonts/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── hooks/
│   │   ├── api/
│   ├── lang/
│   ├── navigation/
│   ├── screens/
│   ├── store/
│   ├── types/
│   ├── utils/
├── App.tsx
```

Explanation of the folders:

- `__tests__`: This folder is for tests. For React Native, we recommend using [Maestro](https://maestro.mobile.dev) as it simplifies UI testing and makes it easier to automate and validate user interactions.
- `credentials`: This folder is for the credentials of the app. Boilerplate is using this folder for the credentials that are used in the whole app. You can find more examples in the `credentials` folder.
- `src`: This folder is for the source code of the app.
  - `assets`: This folder is for the assets of the app. Generally, boilerplate is using this folder for images, locale files, and other types of assets.
    - `images`: This folder is for the images of the app. Boilerplate is using this folder for the images that are used in the whole app. You can import them from the `@app/assets/images` folder.
    - `fonts`: This folder is for the fonts of the app. Boilerplate is using this folder for the fonts that are used in the whole app. You can import them from the `@app/assets/fonts` folder.
  - `components`: This folder is for the components of the app. Boilerplate is using this folder for the components that are used in the whole app. For using the components, export them in the `src/components/index.ts` file and then you can import them from the `@app/components` folder. Boilerplate has export rules for the components, it explains in the [Our Export Rule](#our-export-rule) section.
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

## Firebase Configuration

Boilerplate use the [React Native Firebase](https://rnfirebase.io/) package for Firebase. To use it, you need to add your Firebase configuration.

#### Android

You need to replace your `google-services.json` file inside the `credentials` folder.

#### iOS

You need to replace your `GoogleService-Info.plist` file inside the `credentials` folder.

## Features

1. [Navigation](#navigation)

---

#### Navigation

React Navigation allows you to navigate between screens in your app. In this example, a navigation reference is created using `createNavigationContainerRef`, and this reference is used to navigate between screens.

**1.Updating PAGES file**

every time a new page is added, it should be added to `src/constants/pages` and called that everywhere

**2.Usage Example**

```typescript
import { useAppNavigation } from "@app/hooks";

const navigation = useAppNavigation();
navigation.navigate(PAGES.EDITOR);
```

In this example, the user is navigated to the `PAGES.EDITOR` screen with the `imageUrl` and `id` parameters.

**3.Updating RootStackParamList**

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
- **Routing**: The application's routing logic ensures that different pages are displayed based on the `isLoggedIn` state.
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

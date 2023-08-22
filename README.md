# Bear Necessities

App made by cadets, for cadets.

Includes:

- Accountability features like signing IFN, notifications for fire drills, etc.
- Super fun messageboard
- and more!

## ⚙️ Tech Stack

**Front-End:** React Native <a href="https://reactnative.dev/" title="React Native"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React Native" width="21px" height="21px"></a> / Javascript <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="21px" height="21px"></a>

- React Native is a JavaScript framework that uses native components to create mobile applications. It provides a bridge between JavaScript and the native platform APIs, allowing developers to write code that is compiled into native code for both iOS and Android platforms. React Native also provides a set of built-in components that are platform-specific, which allows developers to create native-looking applications with a single codebase.

**Database:** Firebase <a href="https://www.firebase.com/" title="Firebase"><img src="https://github.com/get-icon/geticon/raw/master/icons/firebase.svg" alt="Firebase" width="21px" height="21px"></a>

- Firebase is a backend-as-a-service (BaaS) platform that provides a wide range of services for mobile and web app development, including authentication, real-time databases, cloud storage, hosting, and more. Firebase can be used with both Expo and React Native to add powerful backend functionality to your cross-platform applications. Firebase provides authentication services that can be used to manage user authentication and authorization in your cross-platform applications. Both Expo and React Native can integrate with Firebase Authentication to provide secure authentication services for your applications. Firebase also provides serverless cloud functions that can be used to add custom logic to your cross-platform applications. These functions can be written in JavaScript and can be triggered by events in your application, such as changes to the Realtime Database.

**Dev Tools:** Expo <a href="https://expo.io/" title="Expo"><img src="https://github.com/get-icon/geticon/raw/master/icons/expo.svg" alt="Expo" width="21px" height="21px"></a>

- Expo is a set of tools and services built on top of React Native that makes it easier to develop cross-platform mobile applications. It provides a set of pre-built UI components, as well as APIs for accessing native functionality like camera, location, and push notifications. Expo also includes a set of development tools that streamline the development process, including a live-reloading development server and an app-building service that simplifies the process of building and publishing apps to app stores.

## 🔧 How to Install for Development

Install NodeJS https://nodejs.org/en

Install Expo command line interface: `npm install expo-cli --global`

Navigate in cmd to somewhere easily accessible. (maybe your desktop)

Create a temporary app. We're going to steal a folder from this app. `npx create-expo-app --template`

Enter `Y` to proceed.

Choose the Blank template.

Name the temporary app whatever you want.

Now clone the repo.

Copy the node_modules folder from your temporary app into \cga-cadet-app in the repo.

Also copy the node_modules folder into \cga-ood-app in the repo.

We won't need the temporary app from this point onward, you can delete it.

Navigate to \cga-cadet-app in the command line.

Download some dependencies `npm install expo-updates`

You'll need to download these dependencies inside \cga-ood-app as well.

Start the app `expo start`

Enter `w` to open the app in your browser. You can download expo go on your iOS or Andriod device to see what the app looks like on a cell phone. The app can also be launched on an emulator on your device.

If you see our login screen, you're good to go!

Open up your favorite IDE (we're using VSCode) https://code.visualstudio.com/

Now you can get started developing :D

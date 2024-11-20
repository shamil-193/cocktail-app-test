# Cocktail Recipe Finder App

A Single Page Application (SPA) built with Angular, Ionic Framework, and Capacitor for searching cocktail recipes. The app can run as a web application and be built as an Android APK.

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- Angular CLI (v18.x or later)
- Ionic CLI (v8.x or later)
- Android Studio (for Android builds)
- Java JDK 8 or later

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/shamil-193/cocktail-app-test.git
   ```
2. Install dependencies
  ```bash
  npm install
  ```
## Running the Web Application

1. Start the development server
   ```bash
   ng serve
   ```
2. Open your browser and navigate to `http://localhost:8100`


## Building debug APK for Android

1. Start production build
  ```bash
  ng build --configuration=production
  ```

2. Add Android platform
  ```bash
  npx cap sync android
  ```
3. Check is Android SDK installed, ANDROID_HOME и JAVA_HOME environment are setted right
4. Generate Debug APK
  Via Command Line:
  ```bash
  cd android
  ./gradlew assembleDebug
  ```
The APK will be generated in the same location android/app/build/outputs/apk/debug/app-debug.apk

## Project Structure
```
src/
├── app/
│   ├── components/        # Reusable components
│   ├── pages/             # Application pages
│   ├── services/          # Services for API calls
│   └── interfaces/        # TypeScript interfaces
├── assets/               # Images and other static files
└── theme/                # Global SCSS files
```
## Features
- Search cocktails by name
- View detailed cocktail information
- Get random cocktail suggestions
- Responsive design for both web and mobile
- Native Android build support

## API Reference
This app uses [TheCocktailDB API](https://www.thecocktaildb.com/api.php) for cocktail data.


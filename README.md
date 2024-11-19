# Cocktail Recipe Finder App

A Single Page Application (SPA) built with Angular, Ionic Framework, and Capacitor for searching cocktail recipes. The app can run as a web application and be built as an Android APK.

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- Angular CLI (`npm install -g @angular/cli`)
- Ionic CLI (`npm install -g @ionic/cli`)
- Android Studio (for Android builds)
- Java JDK 8 or later

## Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd cocktail-finder
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
2. Open your browser and navigate to `http://localhost:4200`


## Building for Android

1. Add Android platform
  ```bash
  ionic cap add android
  ```

2. Build the app
  ```bash
  ionic build
  ionic cap sync
  ```
3. Update native platform code
  ```bash
  ionic cap copy
  ionic cap sync
  ```
4. Open in Android Studio
  ```bash
  ionic cap open android
  ```
5. Generate Debug APK
   In Android Studio:
   1. Go to Build > Build Bundle(s) / APK(s) > Build APK(s)
   2. The APK will be generated in android/app/build/outputs/apk/debug/app-debug.apk
   
  Via Command Line:
  ```bash
  cd android
  ./gradlew assembleDebug
  ```
The APK will be generated in the same location as above.

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


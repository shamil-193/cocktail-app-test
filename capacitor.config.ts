import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cocktailapp.app',
  appName: 'Cocktail Recipes',
  webDir: 'www',
  server: {
    url: 'http://localhost:8100',
    androidScheme: 'https',
    cleartext: true
  }
};

export default config;

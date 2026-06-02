import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.perfume.app',
  appName: 'Perfume',
  webDir: 'dist',
  android: {
    allowMixedContent: true,
  },
  plugins: {
    StatusBar: {
      // overrideable at runtime by main.jsx
      backgroundColor: '#ffffff',
      style: 'DARK',
      overlaysWebView: false,
    },
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    Keyboard: {
      resize: 'body',
    },
  },
};

export default config;

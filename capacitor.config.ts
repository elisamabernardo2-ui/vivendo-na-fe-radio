import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.018691b18c0a48d59f80d4a0a22c32ff',
  appName: 'vivendo-na-fe-radio',
  webDir: 'dist',
  server: {
    url: 'https://018691b1-8c0a-48d5-9f80-d4a0a22c32ff.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1625',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#f59e0b'
    }
  }
};

export default config;
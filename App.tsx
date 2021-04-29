import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './styles/theme';
import AppProvider from './context/appContext';
import Navigation from './navigation/Navigation';
import useCachedResources from './hooks/useCachedResources';
import * as SplashScreen from 'expo-splash-screen';
export default function App() {
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 5000);
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Navigation />
          <StatusBar style="light" />
        </AppProvider>
      </ThemeProvider>
    );
  }
}

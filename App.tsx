import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './styles/theme';
import AppProvider from './context/appContext';
import Navigation from './navigation/Navigation';
import useCachedResources from './hooks/useCachedResources';

export default function App() {
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

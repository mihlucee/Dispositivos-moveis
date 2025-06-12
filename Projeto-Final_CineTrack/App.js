import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import AppNavigator from './navigation/AppNavigator';

const theme = {
  ...DefaultTheme,
  roundness: 10, 
  colors: {
    ...DefaultTheme.colors,
    primary: '#6495ED', 
    accent: '#7FFFD4', 
    background: '#F8F8FF', 
    surface: '#FFFFFF', 
    text: '#333333', 
    onSurface: '#333333', 
    notification: '#FF6347', 
    placeholder: '#A9A9A9', 
    error: '#E06666', 
    cardBackground: '#FFFFFF',
    buttonBackground: '#6495ED', 
    buttonText: '#FFFFFF', 
    inputOutline: '#D3D3D3', 
    inputBackground: '#FFFFFF', 
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

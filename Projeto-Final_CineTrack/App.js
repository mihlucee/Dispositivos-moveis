// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

// Importa o navegador que criamos
import AppNavigator from './navigation/AppNavigator';

// Define o tema do React Native Paper (personalizável)
const theme = {
  ...DefaultTheme,
  roundness: 10, // Aumenta um pouco mais o arredondamento padrão
  colors: {
    ...DefaultTheme.colors,
    primary: '#6495ED', // Azul claro/Cornflower Blue - Moderno e suave
    accent: '#7FFFD4', // Verde Água/Aquamarine - Para acentos e destaque sutil
    background: '#F8F8FF', // Ghost White - Fundo principal muito claro
    surface: '#FFFFFF', // Branco puro - Para superfícies como cards e appbars
    text: '#333333', // Cinza escuro - Bom contraste para textos principais
    onSurface: '#333333', // Cor do texto em superfícies
    notification: '#FF6347', // Vermelho tomate - Para notificações ou alertas
    placeholder: '#A9A9A9', // Cinza claro - Para texto de placeholder e detalhes
    error: '#E06666', // Rosa Coral - Uma cor de erro mais suave
    // Cores específicas para consistência
    cardBackground: '#FFFFFF',
    buttonBackground: '#6495ED', // Botões primários usam a cor primary
    buttonText: '#FFFFFF', // Texto de botões primários em branco
    inputOutline: '#D3D3D3', // Borda de inputs em cinza muito claro
    inputBackground: '#FFFFFF', // Fundo de inputs em branco
  },
};

export default function App() {
  return (
    // Envolve o aplicativo com o PaperProvider para usar os componentes do Paper
    <PaperProvider theme={theme}>
      {/* Envolve o aplicativo com o NavigationContainer para gerenciar a navegação */}
      <NavigationContainer>
        {/* Renderiza o navegador principal */}
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import ListaProdutosScreen from './screens/ListaProdutosScreen';
import ProdutoScreen from './screens/ProdutoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Categorias' }} />
          <Stack.Screen name="ListaProdutos" component={ListaProdutosScreen} options={({ route }) => ({ title: route.params.categoria })} />
          <Stack.Screen name="Produto" component={ProdutoScreen} options={{ title: 'Detalhes do Produto' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

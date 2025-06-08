// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Para ícones nas tabs
import { useTheme } from 'react-native-paper'; // Para usar o tema do Paper

// Importa as telas que criamos
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PopularMoviesScreen from '../screens/PopularMoviesScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import UpcomingMoviesScreen from '../screens/UpcomingMoviesScreen'; // Importa a nova tela

// Cria os navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator para as telas principais (Início, Detalhes, Cadastro)
const HomeStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }, // Usa a cor de fundo do tema
      }}
    >
      <Stack.Screen name="Início" component={HomeScreen} />
      <Stack.Screen name="Detalhes" component={DetailsScreen} />
      <Stack.Screen name="Cadastrar" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Nova Stack Navigator para as telas de Exploração (Populares, Pesquisa)
const ExploreStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }, // Usa a cor de fundo do tema
      }}
    >
      <Stack.Screen name="Populares" component={PopularMoviesScreen} />
      <Stack.Screen name="Pesquisar" component={SearchScreen} />
      <Stack.Screen name="DetalhesExplorar" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

// Stack Navigator para a tela de Favoritos
const FavoritesStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }, // Usa a cor de fundo do tema
      }}
    >
      <Stack.Screen name="MeusFavoritos" component={FavoritesScreen} />
      <Stack.Screen name="DetalhesFavoritos" component={DetailsScreen} />
      <Stack.Screen name="EditarFavoritos" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Stack Navigator para a tela de Próximos Lançamentos
const UpcomingStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }, // Usa a cor de fundo do tema
      }}
    >
      <Stack.Screen name="ProximosLancamentos" component={UpcomingMoviesScreen} />
      {/* Detalhes também de próximos lançamentos */}
      <Stack.Screen name="DetalhesProximos" component={DetailsScreen} />
    </Stack.Navigator>
  );
};


// Tab Navigator para a navegação principal
const AppNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Alterado: "Minha Lista" para "Início" aqui também
          if (route.name === 'Início') {
            iconName = focused ? 'film' : 'film-outline';
          } else if (route.name === 'Explorar') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Favoritos') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Próximos') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Cadastro') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary, // Usa a cor primária do tema
        tabBarInactiveTintColor: theme.colors.placeholder, // Usa a cor de placeholder para inativos
        tabBarStyle: {
          backgroundColor: theme.colors.surface, // Usa a cor de superfície do tema
          borderTopLeftRadius: 20, // Aumenta o arredondamento da borda superior
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 95, // Altura da barra de abas ligeiramente maior
          elevation: 10, // Aumenta a sombra para um efeito mais "flutuante"
          shadowColor: '#000', // Cor da sombra
          shadowOffset: { width: 0, height: -5 }, // Deslocamento da sombra (para cima)
          shadowOpacity: 0.1, // Opacidade da sombra
          shadowRadius: 10, // Raio da sombra
          paddingBottom: 5, // Ajustado: Menos padding na parte inferior para subir os ícones
        },
        tabBarLabelStyle: {
          fontSize: 11, // Ajusta o tamanho da fonte
          marginBottom: 0, // Remove margem inferior para centralizar melhor
        },
        tabBarItemStyle: {
          paddingVertical: 10, // Ajustado: Mais padding vertical para subir os ícones e o texto
        },
      })}
    >
      {/* Alterado o nome da aba para "Início" */}
      <Tab.Screen name="Início" component={HomeStack} />
      <Tab.Screen name="Explorar" component={ExploreStack} />
      <Tab.Screen name="Favoritos" component={FavoritesStack} />
      <Tab.Screen name="Próximos" component={UpcomingStack} />
      <Tab.Screen name="Cadastro" component={RegisterScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;

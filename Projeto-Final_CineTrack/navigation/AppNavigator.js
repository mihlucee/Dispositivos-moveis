import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { useTheme } from 'react-native-paper'; 


import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PopularMoviesScreen from '../screens/PopularMoviesScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import UpcomingMoviesScreen from '../screens/UpcomingMoviesScreen'; 


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }, 
      }}
    >
      <Stack.Screen name="Início" component={HomeScreen} />
      <Stack.Screen name="Detalhes" component={DetailsScreen} />
      <Stack.Screen name="Cadastrar" component={RegisterScreen} />
    </Stack.Navigator>
  );
};


const ExploreStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }, 
      }}
    >
      <Stack.Screen name="Populares" component={PopularMoviesScreen} />
      <Stack.Screen name="Pesquisar" component={SearchScreen} />
      <Stack.Screen name="DetalhesExplorar" component={DetailsScreen} />
    </Stack.Navigator>
  );
};


const FavoritesStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }, 
      }}
    >
      <Stack.Screen name="MeusFavoritos" component={FavoritesScreen} />
      <Stack.Screen name="DetalhesFavoritos" component={DetailsScreen} />
      <Stack.Screen name="EditarFavoritos" component={RegisterScreen} />
    </Stack.Navigator>
  );
};


const UpcomingStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }, 
      }}
    >
      <Stack.Screen name="ProximosLancamentos" component={UpcomingMoviesScreen} />
      <Stack.Screen name="DetalhesProximos" component={DetailsScreen} />
    </Stack.Navigator>
  );
};


const AppNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

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
        tabBarActiveTintColor: theme.colors.primary, 
        tabBarInactiveTintColor: theme.colors.placeholder, 
        tabBarStyle: {
          backgroundColor: theme.colors.surface, 
          borderTopLeftRadius: 20, 
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 95, 
          elevation: 10, 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: -5 }, 
          shadowOpacity: 0.1, 
          shadowRadius: 10, 
          paddingBottom: 5, 
        },
        tabBarLabelStyle: {
          fontSize: 11, 
          marginBottom: 0, 
        },
        tabBarItemStyle: {
          paddingVertical: 10, 
        },
      })}
    >
     
      <Tab.Screen name="Início" component={HomeStack} />
      <Tab.Screen name="Explorar" component={ExploreStack} />
      <Tab.Screen name="Favoritos" component={FavoritesStack} />
      <Tab.Screen name="Próximos" component={UpcomingStack} />
      <Tab.Screen name="Cadastro" component={RegisterScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;

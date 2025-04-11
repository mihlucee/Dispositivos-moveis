import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EscudoScreen from './screens/EscudoScreen';
import JogadoresScreen from './screens/JogadoresScreen';
import TitulosScreen from './screens/TitulosScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
  
  <NavigationContainer>
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Escudo') iconName = 'shield';
        else if (route.name === 'Jogadores') iconName = 'soccer';
        else if (route.name === 'Títulos') iconName = 'trophy';
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;


},

tabBarActiveTintColor: '#006437',
tabBarInactiveTintColor: 'gray',
tabBarStyle: { backgroundColor: '#e6f2e6' }

})}
>
  
  <Tab.Screen name="Escudo" component={EscudoScreen} />
  <Tab.Screen name="Jogadores" component={JogadoresScreen} />
  <Tab.Screen name="Títulos" component={TitulosScreen} />
   
   </Tab.Navigator>
  </NavigationContainer>
);
}
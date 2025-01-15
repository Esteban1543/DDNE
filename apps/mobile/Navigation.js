import { Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import axios from 'axios';
import { URI } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// Iconos
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import favicon from './assets/favicon.png'


// Screens ✨
import LoginView from './src/screens/LoginView';
import Home from './src/screens/Home';
import Inventarios from './src/screens/Inventarios';
import Contabilidad from './src/screens/Contabilidad';
import Personas from './src/screens/Personas';


//🔸 Componentes para Header Interno
const Favicon = ({ showText }) => {
  const redirect = useNavigation();  
  return (
    <TouchableOpacity 
      onPress={() => redirect.navigate("Home")} 
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <Image source={favicon} style={{ width: 28, height: 28, marginLeft: 15, marginRight: 10 }} />
      {showText && <Text style={{ fontSize: 20, fontWeight: '600' }}>DDNE Inventory</Text>}

      {/* <Text style={{ fontSize: 20, fontWeight: '600' }}>DDNE {showText && 'Inventory'}</Text> */}
    </TouchableOpacity>
  )
}

const Logout = () => {
  //🔸 Eliminar Información al Cerrar Sesión del almacenamiento y Backend  
  const redirect = useNavigation();
  const ENDPOINT = `${URI}/cerrar-sesion`;
  
  const removeSession = async () => {
    await AsyncStorage.removeItem('user_session');
    await axios.post(ENDPOINT)
      .then(response => {
        
        if (response.data.success) {
          console.log('Sesión cerrada exitosamente');
          redirect.navigate("Login");
        } else {
          console.error('Error al cerrar sesión:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error en la llamada a la API:', error);
      });
  }

  return (
    <TouchableOpacity
      onPress={removeSession}
      style={{ flexDirection: 'row', alignItems: 'baseline', marginRight: 12 }}
    >
      <MaterialIcons name="logout" size={24} color="#D20062" />
    </TouchableOpacity>
  )
}


//🔸 Navegación Interna (TabBar)
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarActiveBackgroundColor: 'rgb(9, 167, 221)',
        // tabBarActiveBackgroundColor: '#048cba',
        tabBarInactiveBackgroundColor: '#048cba',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.8)',
        tabBarStyle: { height: '7%'},
        tabBarLabelStyle: {paddingBottom: 7, fontSize: 14},
      }}
    >

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '',
          headerTintColor: '#00224D',
          headerTransparent: false,
          headerStyle: { backgroundColor: '#98c8f21c' },
          headerLeft: () => (
            <Favicon showText />
          ),
          headerRight: () => {
            return <Logout />
          },

          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }} />

      <Tab.Screen name="Inventarios" component={Inventarios}
        options={{
          title: 'Inventarios',
          headerTintColor: '#00224D',
          headerTitleAlign: 'center',
          headerTransparent: false,
          headerStyle: { backgroundColor: '#98c8f21c' },
          headerLeft: () => (
            <Favicon showText={false} />
          ),
          headerRight: () => {
            return <Logout />
          },

          tabBarLabel: 'Inventarios',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="inventory" size={22} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Contabilidad"
        component={Contabilidad}
        options={{
          title: 'Contabilidad',
          headerTintColor: '#00224D',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#98c8f21c' },
          headerLeft: () => (
            <Favicon showText={false} />
          ),
          headerRight: () => {
            return <Logout />
          },

          tabBarLabel: 'Contabilidad',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookshelf" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen name="Personas" component={Personas}
        options={{
          title: 'Personas',
          headerTintColor: '#00224D',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#98c8f21c' },
          headerLeft: () => (
            <Favicon showText={false} />
          ),
          headerRight: () => {
            return <Logout />
          },
          
          tabBarLabel: 'Personas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          )
        }}
      />

    </Tab.Navigator>
  );
};


//🔸  Navegación para Autenticación
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer
      initialRouteName='Login'
    >

      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={LoginView}
          options={{
            title: '',
            headerTintColor: '#023793',
            headerTitleAlign: 'center',
            headerShown: false,
            // headerTintColor: '#fff',
            // headerStyle: { backgroundColor: '#1A4055' },
            // headerTransparent: true,
          }}
        />

        <Stack.Screen
          name="HomeTab"
          component={Navigation}
          options={{
            headerShown: false
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default MyStack;
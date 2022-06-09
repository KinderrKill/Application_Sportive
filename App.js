import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet, Text, SafeAreaView, ImageBackground } from 'react-native';

import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

import MainScreen from './src/MainScreen';
import { Icon } from 'react-native-elements';

import * as CONSTANTS from './src/Constants';
import LoginOrRegister from './src/components/connection/LoginOrRegister';
import { useState } from 'react';

const Tab = createBottomTabNavigator();

const BACKGROUND_IMAGE = require('./src/assets/37f4dd0ca81e8b0938697edb9f50aff5.jpg');

/* Tab icon */
const ICON_TYPE = 'feather';
const HOME_ICON = 'home';
const HISTORY_ICON = 'film';
const ACCOUNT_ICON = 'user';

const TABS_SCREEN = [
  {
    name: 'Home',
    component: MainScreen,
    iconName: HOME_ICON,
  },
  {
    name: 'Historique',
    component: MainScreen,
    iconName: HISTORY_ICON,
  },
  {
    name: 'Mon compte',
    component: MainScreen,
    iconName: ACCOUNT_ICON,
  },
];

export default function App() {
  const client = new ApolloClient({
    uri: 'http://192.168.1.64:3000/',
    cache: new InMemoryCache(),
  });

  const [isConnected, setIsConnected] = useState(CONSTANTS.IS_CONNECTED);

  if (isConnected) {
    return (
      <ApolloProvider client={client}>
        <StatusBar style='auto' />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: tabStyle,
            }}>
            {TABS_SCREEN.map((item) => (
              <Tab.Screen
                name={item.name}
                component={item.component}
                options={{
                  showIcon: true,
                  tabBarIcon: ({ color, size }) => (
                    <Icon type={ICON_TYPE} name={item.iconName} color={color} size={size} />
                  ),
                }}
              />
            ))}
          </Tab.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    );
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaView style={styles.login__screen}>
          <ImageBackground source={BACKGROUND_IMAGE} resizeMode='cover' style={styles.image}>
            <StatusBar style='auto' />
            <LoginOrRegister setIsConnected={setIsConnected} />
          </ImageBackground>
        </SafeAreaView>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    justifyContent: 'center',
    margin: 20,
  },
  image: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  login__screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const tabStyle = {
  borderTopLeftRadius: 21,
  borderTopRightRadius: 21,
  backgroundColor: '#fff',
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: CONSTANTS.TAB_BOTTOM_HEIGHT,
  paddingBottom: 20,
  zIndex: 0,
};

// <Tab.Screen
//             name='Home'
//             component={MainScreen}
//             options={{
//               showIcon: true,
//               tabBarIcon: ({ color, size }) => (
//                 <Icon type={ICON_TYPE} name={HOME_ICON} color={color} size={size} />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name='Historique'
//             component={MainScreen}
//             options={{
//               showIcon: true,
//               tabBarIcon: ({ color, size }) => (
//                 <Icon type={ICON_TYPE} name={HISTORY_ICON} color={color} size={size} />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name='Compte'
//             component={MainScreen}
//             options={{
//               showIcon: true,
//               tabBarIcon: ({ color, size }) => (
//                 <Icon type={ICON_TYPE} name={ACCOUNT_ICON} color={color} size={size} />
//               ),
//             }}
//           />

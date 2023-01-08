import React from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import RegistrationScreen from './Screens/auth/RegistrationScreen';
import LoginScreen from './Screens/auth/LoginScreen';
import ProfileScreen from './Screens/mainScreen/ProfileScreen';
import CreatePostsScreen from './Screens/mainScreen/CreatePostsScreen';
import Home from './Screens/mainScreen/Home';

import {styles} from './styles';

const useRoute = (isAuth) => {
  if(!isAuth){
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{headerShown: false}}
          name='Login'
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{headerShown: false}}
          name='Registration'
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  };

  return (
    <MainTab.Navigator screenOptions={{
      tabBarShowLabel: false
      }}>
      <MainTab.Screen
        name='Posts'
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.icon}>
              <Image source={require('./images/grid.png')}
              size={size} color={color}
              />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name='CreatePosts'
        component={CreatePostsScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarStyle: {display: 'none'},
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.plusIcon}>
              <Image source={require('./images/new.png')}
              size={size} color={color}
              />
            </View>
          ),
        }}
        />
      <MainTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.icon}>
              <Image source={require('./images/user.png')}
              size={size} color={color}
              />
            </View>
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;
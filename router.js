import React from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import RegistrationScreen from './Screens/RegistrationScreen/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import ProfileScreen from './Screens/mainScreen/ProfileScreen';
import CreatePostsScreen from './Screens/mainScreen/CreatePostsScreen';
import PostsScreen from './Screens/mainScreen/PostsScreen';
import {styles} from './styles';

import posts from './images/grid.png';
import user from './images/user.png';
import plus from './images/new.png';

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
    <MainTab.Navigator tabBarOptions={{showLabel: false}}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.icon}>
              <Image source={posts}/>
            </View>
          )
        }}
        name='Posts'
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.plusIcon}>
              <Image source={plus}/>
            </View>
          )
        }}
        name='CreatePosts'
        component={CreatePostsScreen}
        />
      <MainTab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.icon}>
              <Image source={user}/>
            </View>
          )
        }}
        name='Profile'
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;
import React from "react";
import {moduleName} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "../nestedScreen/PostsScreen";
import MapScreen from '../nestedScreen/MapScreen';
import CommentsScreen from '../nestedScreen/CommentsScreen';

import {styles} from '../../styles';

const NestedScreen = createStackNavigator();

const Home = () => {
  return (
      <NestedScreen.Navigator style={styles.screenContainer}>
      <NestedScreen.Screen name='PostsScreen' component={PostsScreen}/>
      <NestedScreen.Screen name='Comments' component={CommentsScreen} />
      <NestedScreen.Screen name='Map' component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default Home;
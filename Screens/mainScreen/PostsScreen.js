import React from "react";
import {moduleName} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../nestedScreen/Home";
import MapScreen from '../nestedScreen/MapScreen';
import CommentsScreen from '../nestedScreen/CommentsScreen';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
      <NestedScreen.Navigator>
      <NestedScreen.Screen name='Home' component={Home}/>
      <NestedScreen.Screen name='Comments' component={CommentsScreen} />
      <NestedScreen.Screen name='Map' component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
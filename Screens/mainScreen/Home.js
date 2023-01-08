import React from "react";
import { moduleName,
  TouchableOpacity,
  Image
 } from "react-native";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { authSignOutUser } from "../../redux/auth/authOperations";

import PostsScreen from "../nestedScreen/PostsScreen";
import MapScreen from '../nestedScreen/MapScreen';
import CommentsScreen from '../nestedScreen/CommentsScreen';
import logOut from '../../images/log-out.png';

const NestedScreen = createStackNavigator();

const Home = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
      <NestedScreen.Navigator>
      <NestedScreen.Screen name='PostsScreen' component={PostsScreen}
      options={{ headerTitleAlign: 'center',
      headerRight: () => (
      <TouchableOpacity onPressIn={signOut} style={{marginRight: 16}}>
        <Image source={logOut}/>
      </TouchableOpacity>
      ),
      }}/>
      <NestedScreen.Screen name='Comments' component={CommentsScreen} options={{ headerTitleAlign: 'center' }}/>
      <NestedScreen.Screen name='Map' component={MapScreen} options={{ headerTitleAlign: 'center' }}/>
    </NestedScreen.Navigator>
  );
};

export default Home;
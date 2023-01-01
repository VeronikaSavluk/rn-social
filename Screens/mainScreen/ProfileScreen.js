import React from "react";
import {
  Button,
  View,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import {styles} from '../../styles';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title='Sign out'
      onPress={signOut} 
      />
    </View>
  );
};

export default ProfileScreen;
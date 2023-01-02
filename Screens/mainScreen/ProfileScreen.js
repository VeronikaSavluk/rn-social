import React, {useState, useEffect} from "react";
import {
  Button,
  Image,
  View,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import db from '../../firebase/config';
import {styles} from '../../styles';

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);

  const dispatch = useDispatch();
  const {userId} = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async() => {
    await db.firestore()
    .collection('posts')
    .where('userId', '==', userId)
    .onSnapshot((data) => 
    setUserPosts(data.docs.map(doc => ({...doc.data()})))
    );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <Button title='Sign out'
      onPress={signOut} 
      />
      <FlatList data={userPosts} keyExtractor={(item, idx) => idx.toString()} renderItem={({item}) => (
      <View style={{marginBottom: 32}}>
        <Image source={{uri: item.photo}} style={{marginHorizontal: 10, height: 240}}/>
        <View>
          <Button title='Comments'
          onPress={() => navigation.navigate('Comments', {postId: item.id})}/>
        </View>
        <View>
          <Button title='location'
          onPress={() => navigation.navigate('Map', {location: item.location})}/>
        </View>
      </View>
      )} />
    </View>
  );
};

export default ProfileScreen;
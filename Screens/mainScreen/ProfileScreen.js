import React, {useState, useEffect} from "react";
import {
  ImageBackground,
  Image,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import { authSignOutUser, authStateChangeUser } from "../../redux/auth/authOperations";
import db from '../../firebase/config';

import {styles} from '../../styles';

const ProfileScreen = ({navigation}) => {
  const [userPosts, setUserPosts] = useState([]);
  
  const dispatch = useDispatch();
  
  const user = db.auth().currentUser;
  const {uid, displayName, email, photoURL} = user;

  useEffect(() => {
    getUserPosts();
  }, []);
  
  const getUserPosts = async() => {
    await db.firestore()
    .collection('posts')
    .where('userId', '==', uid)
    .onSnapshot((data) => 
    setUserPosts(data.docs.map(doc => ({...doc.data()})))
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled){
      user.updateProfile({
        displayName: displayName,
        photoURL: result.assets[0].uri
      });
      dispatch(authStateChangeUser());
    } else {
      alert(`You didn't select any Image.`);
    };
  };
  
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../images/bg-photo.png')} style={styles.imageBG}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPressIn={signOut}>
            <Image source={require('../../images/log-out.png')} style={styles.logOut}/>
          </TouchableOpacity>
          <View style={styles.avatar}>
              {photoURL 
                ? <Image source={{uri: photoURL}} style={styles.image}/>
                : <Image source={require('../../images/avatar_default.png')} style={styles.image}/>
              }
              <TouchableOpacity onPressIn={pickImage}>
                {photoURL
                  ? <Image source={require('../../images/add.png')} style={styles.user}/>
                  : <Image source={require('../../images/edit.png')} style={styles.user}/>
                }
              </TouchableOpacity>
          </View>
          <Text style={styles.title}>{displayName}</Text>
          <FlatList style={{width: '100%', paddingHorizontal: 16}} data={userPosts}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({item}) => (
          <View style={{marginBottom: 32}}>
            <Image source={{uri: item.photo}}
            style={{height: 240}}/>
            <Text>{item.title}</Text>
            <View style={styles.infoPost}>
            <TouchableOpacity onPress={() => navigation.navigate('Comments', {postId: item.id})} 
            style={styles.postIconContainer}>
            <Image source={require('../../images/message-circle.png')} style={styles.postIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} 
            style={styles.postIconContainer}>
            <Image source={require('../../images/thumbs-up.png')} style={styles.postIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Map', {location: item.location})} 
            style={{...styles.postIconContainer, width: 255}}>
            <Image source={require('../../images/map-pin.png')} style={styles.postIcon}/>
            <Text>{item.locationTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}/>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
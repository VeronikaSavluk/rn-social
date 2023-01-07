import React, {useState, useEffect} from "react";
import {
  ImageBackground,
  Image,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';
import { authSignOutUser, authStateChangeUser } from "../../redux/auth/authOperations";
import db from '../../firebase/config';

import imageBG from '../../images/bg-photo.png';
import defaultImage from '../../images/avatar_default.png';
import add from '../../images/add.png';
import edit from '../../images/edit.png';
import logOut from '../../images/log-out.png';
import locationIcon from '../../images/map-pin.png';
import commentIcon from '../../images/message-circle.png';
import likeIcon from '../../images/thumbs-up.png';
import {styles} from '../../styles';

const ProfileScreen = ({navigation}) => {
  const [userPosts, setUserPosts] = useState([]);
  
  const dispatch = useDispatch();
  const {userId, nickname, email, image} = useSelector((state) => state.auth);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled){
      dispatch(authStateChangeUser({userId, nickname, email, image: result.assets[0].uri}));
    } else {
      alert(`You didn't select any Image.`);
    };
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={imageBG} style={styles.imageBG}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPressIn={signOut}>
            <Image source={logOut} style={styles.logOut}/>
          </TouchableOpacity>
          <View style={styles.avatar}>
              {image 
                ? <Image source={image} style={styles.image}/>
                : <Image source={defaultImage} style={styles.image}/>
              }
              <TouchableOpacity onPressIn={pickImage}>
                {image
                  ? <Image source={add} style={styles.user}/>
                  : <Image source={edit} style={styles.user}/>
                }
              </TouchableOpacity>
          </View>
          <Text style={styles.title}>{nickname}</Text>
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
            <Image source={commentIcon} style={styles.postIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} 
            style={styles.postIconContainer}>
            <Image source={likeIcon} style={styles.postIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Map', {location: item.location})} 
            style={{...styles.postIconContainer, width: 255}}>
            <Image source={locationIcon} style={styles.postIcon}/>
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
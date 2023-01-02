import React, {useState, useEffect} from "react";
import {useSelector} from 'react-redux';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import {Camera} from 'expo-camera';
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import db from '../../firebase/config';

import {styles} from '../../styles';
import cameraIcon from '../../images/camera.png';
import locationIcon from '../../images/map-pin.png';

const CreatePostsScreen = ({navigation}) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState('');
  const [locationTitle, setLocationTitle] = useState('');
  const [location, setLocation] = useState(null);

  const {userId, nickname} = useSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      };

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    await MediaLibrary.createAssetAsync(photo.uri);
    setPhoto(photo.uri);
  };
  
  const uploadPhoto = () => {
    uploadPostToServer();
    navigation.navigate('Home', {photo});
  };
  
  const uploadPostToServer = async() => {
    const photo = await uploadPhotoToServer();
    await db.firestore()
    .collection('posts')
    .add({photo, comment, locationTitle, location: location.coords, userId, nickname});
  };

  const uploadPhotoToServer = async() => {
    const response = await fetch(photo);
    const file = await response.blob();
    
    const uniquePostId = Date.now().toString();
    await db.storage().ref(`postImage/${uniquePostId}`).put(file);
    
    const processedPhoto = await db
    .storage()
    .ref(`postImage`)
    .child(uniquePostId)
    .getDownloadURL();

    return processedPhoto;
  };

  return (
    <View style={styles.createContainer}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoView}>
            <Image source={{uri: photo}} style={{width: '100%', height: '100%'}}/>
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <Image source={cameraIcon} style={styles.snap}/>
        </TouchableOpacity>
      </Camera>
      <Text style={{color:'#BDBDBD', marginBottom: 32}}>Edit photo</Text>
      <View>
        <TextInput style={styles.input}
        placeholder="Name..."
        onChangeText={setComment}
        />
        <View style={{...styles.postIconContainer, paddingHorizontal: 0}}>
        <TextInput style={{...styles.input, paddingLeft: 35}}
        placeholder="Location..."
        onChangeText={setLocationTitle}
        />
        <TouchableOpacity style={styles.postIconLocation} onPress={() => navigation.navigate('Map', {location: item.location})}>
        <Image source={locationIcon}/>
        </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={uploadPhoto}>
        <Text style={{...styles.text, color: '#ffffff'}}>Publish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostsScreen;
import React, {useState, useEffect} from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import {Camera} from 'expo-camera';
import * as Location from "expo-location";

import {styles} from '../../styles';
import cameraIcon from '../../images/camera.png';

const CreatePostsScreen = ({navigation}) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPhoto(photo.uri);
    console.log('location:', location.coords.latitude);
    console.log('location:', location.coords.longitude);
  };
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log('status', status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
    })();
  }, []);

  const uploadPhoto = () => {
    navigation.navigate('Home', {photo});
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
      <TouchableOpacity onPress={uploadPhoto}>
        <Text>Uploud photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostsScreen;
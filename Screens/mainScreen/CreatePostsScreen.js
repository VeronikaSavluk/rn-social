import React, {useState, useEffect} from "react";
import {useSelector} from 'react-redux';
import {
  Image,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import { Camera } from 'expo-camera';
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';
import db from '../../firebase/config';

import {styles} from '../../styles';
import cameraIcon from '../../images/camera.png';
import locationIcon from '../../images/map-pin.png';

const CreatePostsScreen = ({navigation}) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('');
  const [locationTitle, setLocationTitle] = useState('');
  const [location, setLocation] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  const {userId} = useSelector(state => state.auth);
 
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

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  };

  const takePhoto = async () => {
    const photoFromCamera = await camera.takePictureAsync();
    await MediaLibrary.createAssetAsync(photoFromCamera.uri);
    setPhoto(photoFromCamera.uri);
    setIsDisabled(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if(!result.canceled){
      setPhoto(result.assets[0].uri);
    } else {
      alert(`You didn't select any Image.`);
    };
    setIsDisabled(false);
  };

  const uploadPhoto = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    uploadPostToServer();
    navigation.navigate('PostsScreen', {photo});
    setIsDisabled(true);
    setPhoto(null);
    setTitle('');
    setLocationTitle('');
  };
  
  const uploadPostToServer = async() => {
    const photo = await uploadPhotoToServer();
    await db.firestore()
    .collection('posts')
    .add({photo, title, locationTitle, location: location.coords, userId});
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
  
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={{...styles.screenContainer, justifyContent: "flex-end"}}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={{paddingBottom: 16, marginBottom: isShowKeyboard ? -120 : 0}}>
            <Camera style={styles.camera} ref={setCamera}>
              {photo && (
              <View style={styles.takePhotoView}>
                <Image source={{uri: photo}}
                style={{height: '100%', width: '100%', borderRadius: 8}}
                />
              </View>
              )}
            <TouchableOpacity
              onPress={takePhoto}
              style={styles.snapContainer}
            >
              <Image source={cameraIcon} style={styles.snap}/>
            </TouchableOpacity>
            </Camera>
          <Text
            style={{color:'#BDBDBD', marginBottom: 16}}
            onPress={pickImage}
          >Edit photo
          </Text>
          <TextInput style={styles.input}
            value={title}
            onFocus={() => setIsShowKeyboard(true)}
            placeholder="Name..."
            onChangeText={setTitle}
          />
          <View style={styles.postIconContainer}>
          <TextInput
            style={{...styles.input, paddingLeft: 35}}
            value={locationTitle}
            onFocus={() => setIsShowKeyboard(true)}
            placeholder="Location..."
            onChangeText={setLocationTitle}
          />
          <TouchableOpacity
            style={styles.postIconLocation}
            onPress={() => navigation.navigate('Map', {location: item.location})}
          >
            <Image source={locationIcon}/>
          </TouchableOpacity>
          </View>
          <TouchableOpacity disabled={isDisabled}
          style={{
            ...styles.btn,
            marginBottom: 16,
            backgroundColor: isDisabled ? '#F6F6F6' : '#FF6C00'
          }}
          onPress={uploadPhoto}
          >
            <Text style={{
              ...styles.text,
              color: isDisabled ? '#BDBDBD' : '#ffffff'
              }}>Publish
            </Text>
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={() => navigation.navigate('PostsScreen')} 
          style={styles.trashIcon}
          >
            <Image
            source={require('../../images/trash.png')}
            style={styles.postIcon}
            />
          </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
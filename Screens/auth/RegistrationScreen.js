import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useDispatch} from 'react-redux';
import {authSignUpUser} from '../../redux/auth/authOperations';

import { styles } from '../../styles';
import initialState from '../../templates/initialstate';

import imageBG from '../../images/bg-photo.png';
import add from '../../images/add.png';
import edit from '../../images/edit.png';
import defaultImage from '../../images/avatar_default.png';

export default function RegistrationScreen({navigation}) {
  
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  
  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled){
      setState((prevState) => ({...prevState, image: result.assets[0].uri}));
    } else {
      alert(`You didn't select any Image.`);
    };
  };

  useEffect(() => {
    const {email, password} = state;
    if(email !== '' && password !== ''){
      setIsDisabled(false);
    };
  }, [state]);

  const toggleSecureTextEntry = () => {
    setIsSecureTextEntry((prevState) => !prevState);
  };

  const handleSubmit = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
      dispatch(authSignUpUser(state));
      setState(initialState);
      setIsDisabled(true);
    };

    const keyboardHide = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
    };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={imageBG} style={styles.imageBG}>
          <View style={styles.form}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={{paddingBottom: 45, alignItems: 'center',
            marginBottom: isShowKeyboard ? -160 : 0}}>
              <View style={styles.avatar}>
                {state.image 
                  ? <Image source={{uri: state.image}} style={styles.image}/>
                  : <Image source={defaultImage} style={styles.image}/>
                }
                <TouchableOpacity onPressIn={pickImage}>
                  {!state.image
                  ? <Image source={add} style={styles.user}/>
                  : <Image source={edit} style={styles.user}/>}
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Registration</Text>
              <TextInput
                name='nickname'
                value={state.nickname}
                placeholder='Login'
                placeholderTextColor='#BDBDBD'
                style={styles.inputAuth}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => setState(prevState => ({...prevState, nickname: value}))}
              />
              <TextInput
                name='email'
                value={state.email}
                placeholder='Email address'
                placeholderTextColor='#BDBDBD'
                style={styles.inputAuth}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => setState(prevState => ({...prevState, email: value}))}
              />
              <View style={styles.password}>
              <TextInput
                name='password'
                value={state.password}
                autoComplete='off'
                placeholder='Password'
                secureTextEntry={isSecureTextEntry}
                placeholderTextColor='#BDBDBD'
                style={styles.inputAuth}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => setState(prevState => ({...prevState, password: value}))}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.showPassword}
                onPress={toggleSecureTextEntry}
              >
                <Text style={styles.showBtn}>Show</Text>
              </TouchableOpacity>
              </View>
              <TouchableOpacity
                disabled={isDisabled}
                style={{...styles.btn, backgroundColor: isDisabled ? '#F6F6F6' : '#FF6C00'}}
                activeOpacity={0.8}
                onPress={handleSubmit}
              >
                <Text style={{...styles.text, color: isDisabled ? '#BDBDBD' : '#ffffff'}}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={{color: '#1B4371', textAlign: 'center'}}>
                  Do you already have an account?
                  <Text> Log in</Text>
                </Text>
              </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
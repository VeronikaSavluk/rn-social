import React, {useState} from 'react';
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

import { styles } from '../../styles';
import initialState from '../../templates/initialstate';

import imageBG from '../../images/bg-photo.png';
import defaultImage from '../../images/avatar_default.png';
import image from '../../images/avatar.png';

export default function RegistrationScreen({navigation}) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
      console.log(state);
      setState(initialState);
    };
console.log(Platform)
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={imageBG} style={styles.imageBG}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={{...styles.form,
              paddingBottom: 45,
              marginBottom: isShowKeyboard ? -142 : 0
            }}>
              <View style={styles.avatar}>
                {image 
                  ? <Image source={image} style={styles.image}/>
                  : <Image source={defaultImage} style={styles.image}/>
              }
              </View>
              <Text style={styles.title}>Registration</Text>
              <TextInput
                name='name'
                value={state.name}
                placeholder='Login'
                placeholderTextColor='#BDBDBD'
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => setState(prevState => ({...prevState, name: value}))}
              />
              <TextInput
                name='email'
                value={state.email}
                placeholder='Email address'
                placeholderTextColor='#BDBDBD'
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => setState(prevState => ({...prevState, email: value}))}
              />
              <TextInput
                name='password'
                value={state.password}
                autoComplete='off'
                placeholder='Password'
                secureTextEntry={true}
                placeholderTextColor='#BDBDBD'
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) => setState(prevState => ({...prevState, password: value}))}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.text}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={{color: '#1B4371'}}>
                  Do you already have an account?
                  <Text> Log in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
import React, {useState} from 'react';
import {
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
import {useDispatch} from 'react-redux';
import {authSignInUser} from '../../redux/auth/authOperations';

import { styles } from '../../styles';
import imageBG from '../../images/bg-photo.png';
import initialState from '../../templates/initialstate';

export default function LoginScreen({navigation}) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  const toggleSecureTextEntry = () => {
    setIsSecureTextEntry((prevState) => !prevState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={imageBG} style={styles.imageBG}>
          <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={{
              ...styles.form,
              paddingBottom: 110,
              marginBottom: isShowKeyboard ? -207 : 0
            }}>
              <Text style={styles.title}>Login</Text>
              <TextInput
                name='email'
                value={state.email}
                placeholder='E-mail'
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
                activeOpacity={0.8}
                style={styles.btn}
                onPress={handleSubmit}
              >
                <Text style={styles.text}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => navigation.navigate('Registration')}
              >
                <Text style={{color:'#1B4371'}}>
                  Don't have an account yet?
                  <Text> Sign up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
import React, {useState} from 'react';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
import {
  StyleSheet, 
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard
} from 'react-native';

const imageBG = require('./images/bg-photo.png');
const image = require('./images/avatar.png');

function keyboardHide() {
  setIsShowKeyboard(false);
  Keyboard.dismiss();
};
// const loadFonts = async () => {
//   await Font.loadAsync({
//     'RobotoRegular': require('./assets/fonts/Roboto-Regular.ttf'),
//     'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf'),
//   });
// };

export default function App() {
  const[isLogin, setIsLogin] = useState(false);
  // const [isReady, setIsReady] = useState(false);
  
  // if (!isReady) {
  //   return (
  //   <AppLoading
  //   startAsync={loadFonts}
  //   onFinish={() => setIsReady(true)}
  //   />
  //   )
  // };

  return (
    <View style={styles.container}>
      <ImageBackground source={imageBG} style={styles.imageBG}>
          {!isLogin ? <LoginScreen/> : <RegistrationScreen />}
      </ImageBackground>
    </View>
  );
};

const RegistrationScreen = () => {
  const [value, setValue] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const inputHandler = (text) => setValue(text);

  return (
    <View>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{...styles.form, marginTop: isShowKeyboard ? 43 : 219}} onChangeText={inputHandler}>
        <View style={styles.avatar}>
        {image && <Image source={image} style={styles.image}/>}
        </View>
        <Text style={styles.title}>Registration</Text>
        <TextInput
          name='name'
          placeholder='Login'
          placeholderTextColor='#BDBDBD'
          style={styles.input}
          onFocus={() => setIsShowKeyboard(true)}
        />
        <TextInput
          name='email'
          placeholder='Email address'
          placeholderTextColor='#BDBDBD'
          style={styles.input}
          onFocus={() => setIsShowKeyboard(true)}
        />
        <TextInput
          name='password'
          autoComplete='off'
          placeholder='Password'
          secureTextEntry={true}
          placeholderTextColor='#BDBDBD'
          style={styles.input}
          onFocus={() => setIsShowKeyboard(true)}
        />
        <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btn}
        onPress={keyboardHide}
        >
          <Text style={styles.text}>Sign in</Text>
        </TouchableOpacity>
        <Text style={{color: '#1B4371'}}>
          Do you already have an account? Log in
        </Text>
      </View>
    </KeyboardAvoidingView>
    </View>
  );
};

const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  return (
    <View>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{...styles.form, paddingBottom: !isShowKeyboard ? 100 : 32}}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder='E-mail'
          placeholderTextColor='#BDBDBD'
          style={styles.input}
          onFocus={() => setIsShowKeyboard(true)}
        />
        <TextInput
          autoComplete='off'
          placeholder='Password'
          secureTextEntry={true}
          placeholderTextColor='#BDBDBD'
          style={styles.input}
          onFocus={() => setIsShowKeyboard(true)}
        />
        <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btn}
        onPress={keyboardHide}
        >
          <Text style={styles.text}>Log in</Text>
        </TouchableOpacity>
        <Text style={{color:'#1B4371'}}>Don't have an account yet? Sign in</Text>
      </View>
    </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageBG:{
    flex: 1,
    resizeMode: 'center',
    justifyContent: 'flex-end',
  },
  avatar: {
    marginTop: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  title: {
    marginVertical: 32,
    // fontFamily: 'RobotoBold',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  input: {
    padding: 16,
    marginBottom: 16,
    width: '100%',
    // fontFamily: 'RobotoRegular',
    fontSize: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  btn: {
    // fontFamily: 'RobotoBold',
    marginTop: 35,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },
});

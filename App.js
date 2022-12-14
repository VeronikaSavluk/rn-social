import React from 'react';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, Image, Text, TextInput, TouchableHighlight, View } from 'react-native';

const imageBG = require('./images/bg-photo.png');
const image = require('./images/avatar.png');
// const loadFonts = async () => {
//   await Font.loadAsync({
//     'RobotoRegular': require('./assets/fonts/Roboto-Regular.ttf'),
//     'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf'),
//   });
// };

export default function App() {
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
      <RegistrationScreen />
      <StatusBar style='auto' />
    </View>
  );
};

const RegistrationScreen = ()=> {
  return (
  <View style={styles.container}>
    <ImageBackground source={imageBG} resizeMode="cover" style={styles.imageBG}>
      <Image source={image} style={styles.image}/>
    <View style={styles.form}>
    <Text style={styles.title}>Registration</Text>
    <TextInput
      placeholder='Login'
      placeholderTextColor='#BDBDBD'
      style={styles.input}
    />
    <TextInput
      placeholder='E-mail'
      placeholderTextColor='#BDBDBD'
      style={styles.input}
    />
    <TextInput
      autoComplete='off'
      placeholder='Password'
      secureTextEntry={true}
      placeholderTextColor='#BDBDBD'
      style={styles.input}
    />
    <TouchableHighlight 
    // onPress={onPress}
    >
        <View style={styles.button}>
          <Text style={styles.text}>Register</Text>
        </View>
      </TouchableHighlight>
    </View>
    </ImageBackground>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  imageBG:{
    flex: 1,
    justifyContent: "center"
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  title: {
    marginBottom: 32,
    // fontFamily: 'RobotoBold',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 16,
    borderTopStartRadius: 100,
  },
  input: {
    padding: 16,
    // fontFamily: 'RobotoRegular',
    fontSize: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    // fontFamily: 'RobotoBold',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },
});

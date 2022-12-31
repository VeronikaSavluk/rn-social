import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { AppLoading } from 'expo';
// import loadFonts from './templates/font';
import useRoute from './router';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import db from './firebase/config';

export default function App() {
  // const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  db.auth().onAuthStateChanged((user) => setUser(user));
console.log(user.uid)
  const routing = useRoute(user);

  
  // if (!isReady) {
  //   return (
  //   <AppLoading
  //   startAsync={loadFonts}
  //   onFinish={() => setIsReady(true)}
  //   />
  //   )
  // };

  return (
    <Provider store={store}>
    <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
};
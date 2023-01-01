import React, { useState } from 'react';
// import { AppLoading } from 'expo';
// import loadFonts from './templates/font';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import Main from './components/Main';

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
    <Provider store={store}>
    <Main />
    </Provider>
  );
};
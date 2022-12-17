import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { AppLoading } from 'expo';
// import loadFonts from './templates/font';
import useRoute from './router';

export default function App() {
  // const [isReady, setIsReady] = useState(false);
  const routing = useRoute(false);
  // if (!isReady) {
  //   return (
  //   <AppLoading
  //   startAsync={loadFonts}
  //   onFinish={() => setIsReady(true)}
  //   />
  //   )
  // };

  return (
    <NavigationContainer>{routing}</NavigationContainer>
  );
};
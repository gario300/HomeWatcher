import React, { useState, useEffect } from 'react';
import styles from "./src/shared/Styles/safe_area.style"
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContainer from "./src/navigation"
import * as Font from 'expo-font';
import { ThemeProvider } from "react-native-rapi-ui";
import { Provider } from 'react-redux';
import configureStore from './src/redux/store';
import Constants from 'expo-constants'
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: Constants!.manifest!.extra!.apiKey,
  authDomain: Constants!.manifest!.extra!.authDomain,
  projectId: Constants!.manifest!.extra!.projectId,
  storageBucket: Constants!.manifest!.extra!.storageBucket,
  messagingSenderId: Constants!.manifest!.extra!.messagingSenderId,
  appId: Constants!.manifest!.extra!.appId
};
initializeApp(firebaseConfig);
export default function App() {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    loadFonts() 
  }, []);
  const store = configureStore() 
  const loadFonts = async() => {
    try {
      await Font.loadAsync({
        'Regular': require('./assets/fonts/Quantico-Regular.otf'),
        'Medium': require('./assets/fonts/Quantico-Bold.otf'),
        'Bold': require('./assets/fonts/Quantico-Bold.otf'),
        'SemiBold': require('./assets/fonts/Quantico-BoldItalic.otf'),
        'Italic': require('./assets/fonts/Quantico-Italic.otf'),
        'Light': require('./assets/fonts/Quantico-Italic.otf'),
        'LightItalic': require('./assets/fonts/Quantico-Italic.otf')
      });
      setLoading(true) 
    } catch (e) {
      setLoading(false)
    }
  }
  if (!loading) {
    return null
  }
  return(
    <SafeAreaView style={styles.droidSafeArea}>
      <ThemeProvider
        theme='dark'
      >
        <Provider
          store={ store }
        >
          <AppContainer/>
        </Provider>
      </ThemeProvider>
    </SafeAreaView>
  );
}


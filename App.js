import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { useRoute } from './router';

import AppStyles from './AppStyles';

export default function App() {
  const routing = useRoute(true);

  const [isReady, setIsReady] = useState(false);

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  return <NavigationContainer>{routing}</NavigationContainer>;
}

const styles = StyleSheet.create({});

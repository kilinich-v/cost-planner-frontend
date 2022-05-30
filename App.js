import { useState } from 'react';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Router from './Router';
import store from './store/store';

import AppStyles from './AppStyles';

export default function App() {
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

  return (
    <NavigationContainer>
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: AppStyles.palette.honeydew }}>
          <Router />
        </View>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

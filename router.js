import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import NotesScreen from './screens/main/NotesScreen';
import NoteModal from './components/NoteModal';

import AppStyles from './AppStyles';
import { useCurrentUserMutation } from './store/user/userSlice';
import { useApiToken } from './hooks';

const Stack = createNativeStackNavigator();

const Router = () => {
  const [token, setToken] = useApiToken();

  const [currentUser, { isLoading, isSuccess, isError, error, data }] =
    useCurrentUserMutation();

  useEffect(async () => {
    if (token) {
      try {
        await currentUser(token).unwrap();
      } catch (error) {
        setToken('');
      }
    }
  }, [token]);

  if (isLoading) {
    return (
      <ActivityIndicator
        size='large'
        style={{ flex: 1 }}
        color={AppStyles.palette.celadonBlue}
      />
    );
  }

  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Group navigationKey={'user'}>
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name='NotesScreen'
              component={NotesScreen}></Stack.Screen>
          </Stack.Group>
        </>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={{
              headerShown: false
            }}
            name='Login'
            component={LoginScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false
            }}
            name='Register'
            component={RegisterScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );

  // return (
  //   <MainStack.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //       tabBarShowLabel: false,
  //       tabBarActiveTintColor: AppStyles.palette.prussianBlue,
  //       tabBarInactiveTintColor: AppStyles.palette.powderBlue,
  //       tabBarActiveBackgroundColor: AppStyles.palette.honeydew
  //     }}>

  //   </MainStack.Navigator>
  // );
};

export default Router;

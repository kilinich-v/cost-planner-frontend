import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import NoteListScreen from './screens/main/NoteListScreen';
import NoteAddScreen from './screens/main/NoteAddScreen';
import ReportsScreen from './screens/main/ReportsScreen';

import AppStyles from './AppStyles';
import { useCurrentUserMutation } from './store/user/userSlice';
import { getStorage } from './utils/helpers';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

const Router = () => {
  const [currentUser, { isLoading, isSuccess, isError, error, data }] =
    useCurrentUserMutation();
  const { getItem } = useAsyncStorage('@api_key');

  const [token, setToken] = useState(null);

  useEffect(async () => {
    setToken(await getItem());
  }, []);

  useEffect(async () => {
    if (token) await currentUser(token).unwrap();
  }, [token]);

  if (!token) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false
          }}
          name='Login'
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false
          }}
          name='Register'
          component={RegisterScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: AppStyles.palette.prussianBlue,
        tabBarInactiveTintColor: AppStyles.palette.powderBlue,
        tabBarActiveBackgroundColor: AppStyles.palette.honeydew
      }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name='format-list-bulleted-square'
              size={focused ? size + 2 : size}
              color={color}
            />
          )
        }}
        name='NoteList'
        component={NoteListScreen}></MainTab.Screen>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name='ios-add-circle-outline'
              size={focused ? size + 2 : size}
              color={color}
            />
          )
        }}
        name='NoteAdd'
        component={NoteAddScreen}></MainTab.Screen>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons
              name='calculator'
              size={focused ? size + 2 : size}
              color={color}
            />
          )
        }}
        name='ReportsScreen'
        component={ReportsScreen}></MainTab.Screen>
    </MainTab.Navigator>
  );
};

export default Router;

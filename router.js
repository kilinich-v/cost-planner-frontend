import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = isAuth => {
  //   if (!isAuth) {
  if (true) {
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
};

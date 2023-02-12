import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PATHS from '../consts/paths';
import ProfileScreen from '../screens/Profile';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={PATHS.ProfileScreen} component={ProfileScreen} />
    </Stack.Navigator>
  );
}

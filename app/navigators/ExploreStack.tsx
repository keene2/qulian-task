import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PATHS from '../consts/paths';
import ExploreScreen from '../screens/Explore';

const Stack = createNativeStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator
      initialRouteName="ExploreStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={PATHS.ExploreScreen} component={ExploreScreen} />
    </Stack.Navigator>
  );
}

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PATHS from '../consts/paths';
import MarketScreen from '../screens/Market';

const Stack = createNativeStackNavigator();

export default function MarketStack() {
  return (
    <Stack.Navigator
      initialRouteName="MarketStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={PATHS.MarketScreen} component={MarketScreen} />
    </Stack.Navigator>
  );
}

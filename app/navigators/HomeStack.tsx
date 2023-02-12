import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PATHS from "consts/paths";
import HomeScreen from "../screens/Home";
import MarketScreen from "../screens/Market";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeStack"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={PATHS.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={PATHS.MarketScreen} component={MarketScreen} />
    </Stack.Navigator>
  );
}

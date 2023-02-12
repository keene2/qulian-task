import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import MarketStack from "./MarketStack";
import ExploreStack from "./ExploreStack";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ tabBarIcon: HomeIcon }}
        />
        <Tab.Screen
          name="Market"
          component={MarketStack}
          options={{ tabBarIcon: MarketIcon }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreStack}
          options={{ tabBarIcon: ExploreIcon }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{ tabBarIcon: ProfileIcon }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeIcon() {
  return (
    <Image
      style={{ width: 24, height: 24 }}
      source={require("assets/tab1.png")}
    />
  );
}
function MarketIcon() {
  return (
    <Image
      style={{ width: 24, height: 24 }}
      source={require("assets/tab2.jpg")}
    />
  );
}
function ExploreIcon() {
  return (
    <Image
      style={{ width: 24, height: 24 }}
      source={require("assets/tab3.png")}
    />
  );
}
function ProfileIcon() {
  return (
    <Image
      style={{ width: 24, height: 24 }}
      source={require("assets/tab4.png")}
    />
  );
}

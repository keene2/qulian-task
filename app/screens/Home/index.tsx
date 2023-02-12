import React from "react";
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import PATHS from "consts/paths";
import common from "style/common.style";
import Screen from "components/Screen";
import { ACTIVITIES_CARD_OPTIONS } from "./consts";
import MarketCard from "./components/MarketCard";
import DataCard from "./components/DataCard";
import styles from "./index.style";

const HOME_DATA_OPTIONS_MOCK = [
  {
    id: 1,
    title: "BTC VS HSI",
    subtitle: "More growth",
    earningText: "+100.09%",
  },
  {
    id: 2,
    title: "BTC VS HSI",
    subtitle: "More growth",
    earningText: "+100.09%",
  },
  {
    id: 3,
    title: "BTC VS HSI",
    subtitle: "More growth",
    earningText: "+100.09%",
  },
];

function HomeScreen({ navigation }: any) {
  return (
    <Screen>
      <ScrollView style={styles.container}>
        {/* Banner */}
        <ImageBackground
          source={require("assets/banner.jpg")}
          resizeMode="cover"
          style={styles.banner}>
          <DataCard options={HOME_DATA_OPTIONS_MOCK} />
        </ImageBackground>

        {/* Purchase */}
        <TouchableOpacity
          style={[styles.purchaseContainer, styles.cardCommonShadow]}
          onPress={() => navigation.push(PATHS.MarketScreen)}>
          <ImageBackground
            style={styles.purchaseContent}
            source={require("assets/purchase-bg.png")}>
            <Text style={[styles.purchaseContentTitle, common.fw3, common.f14]}>
              Flash-speed Purchase
            </Text>
            <Text style={[common.mt4, common.f11, common.T3]}>
              Commission-free, instant transfer
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        {/* Activities */}
        <View style={[styles.activitiesCardContainer, styles.cardCommonShadow]}>
          {ACTIVITIES_CARD_OPTIONS.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.activitiesCardItem, styles.cardCommonShadow]}
                onPress={() => navigation.push(PATHS.MarketScreen)}>
                <View>
                  <Text style={[common.f12, common.T2, common.fw3]}>
                    {item.title}
                  </Text>
                  <Text style={[common.mt2, common.T4, common.f11]}>
                    {item.subtitle}
                  </Text>
                </View>
                <Image style={[item.imageStyle]} source={item.source} />
              </TouchableOpacity>
            );
          })}
        </View>
        {/* Market */}
        <MarketCard />
      </ScrollView>
    </Screen>
  );
}

export default HomeScreen;

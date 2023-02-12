import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { randomArray } from "utils/random-array";
import { LOCAL_FAIT_UNIT, TrendStatus } from "consts/financial";
import LineChartView from "components/LineChart";
import common from "style/common.style";
import TrendNumView from "./TrendNumView";

function MarketCryptos() {
  const marketList = [
    {
      id: 1,
      coin: "BTC",
      priceStr: "9198.56",
      localFiatPriceStr: "102162.80",
      iconPath: require("assets/btc-icon.png"),
      trendStatus: TrendStatus.Up,
      rise: 1.25,
    },
    {
      id: 2,
      coin: "ETH",
      priceStr: "201.18",
      localFiatPriceStr: "173.55",
      trendStatus: TrendStatus.Dwom,
      rise: -1.66,
      iconPath: require("assets/eth-icon.png"),
    },
    {
      id: 3,
      coin: "XRP",
      priceStr: "9198.56",
      localFiatPriceStr: "102162.80",
      trendStatus: TrendStatus.Zero,
      rise: 1.62,
      iconPath: require("assets/xrp-icon.png"),
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[common.f18, common.fw3]}>Market</Text>
        <View style={styles.headerRight}>
          <Text style={[common.f12, common.T3, common.fw3]}>More</Text>
          <Icon name="chevron-forward" size={12} color="#696F7F" />
        </View>
      </View>
      <View>
        {marketList.map((item) => (
          <View key={item.id} style={styles.marketListItem}>
            <Image style={{ width: 24, height: 24 }} source={item.iconPath} />
            <View style={common.ml6}>
              <Text style={[common.T2, common.f14, common.fw3]}>
                {item.coin}
                <Text style={[common.T4, common.f10]}>/USDT</Text>
              </Text>
            </View>
            <View style={styles.lineChartViewStyle}>
              <LineChartView data={randomArray()} />
            </View>
            <View style={styles.marketListItemPrice}>
              <Text style={[common.f12, common.fw3]}>{item.priceStr}</Text>
              <Text style={[common.f10, common.T4]}>
                ≈ {LOCAL_FAIT_UNIT}$ {item.localFiatPriceStr}
              </Text>
            </View>
            <TrendNumView trendStatus={item.trendStatus} num={item.rise} />
          </View>
        ))}
      </View>
    </View>
  );
}

export default MarketCryptos;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "rgba(239,233,255,1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
  },
  lineChartViewStyle: {
    marginLeft: 10,
    width: 56,
    height: 36,
  },
  marketListItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
  },
  marketListItemPrice: {
    alignItems: "flex-end",
    marginLeft: 10,
    width: 100,
  },
  marketListItemUpsAndDowns: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TrendStatus } from "consts/financial";
import common from "style/common.style";

interface TrendNumViewProps {
  trendStatus: TrendStatus;
  num: number;
}

const TrendNumView = ({ trendStatus, num }: TrendNumViewProps) => {
  let color = "#ccc";
  let text = "0.00";
  let iconName = "";
  switch (trendStatus) {
    case TrendStatus.Up:
      color = "#60D937";
      text = `+${num}`;
      iconName = "caret-up";
      break;
    case TrendStatus.Dwom:
      color = "#ED220D";
      text = String(num);
      iconName = "caret-down";
      break;
    case TrendStatus.Zero:
      // todo: 缺少涨跌幅为0的色值
      color = "#ccc";
      break;
    default:
      color = "#ccc";
      break;
  }
  return (
    <View style={[styles.marketListItemUpsAndDowns, common.fdr, common.aic]}>
      {iconName && <Icon name={iconName} size={14} color={color} />}
      <Text style={[common.f12, { color }]}>{text}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default TrendNumView;

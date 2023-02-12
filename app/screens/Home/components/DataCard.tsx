import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import common from "style/common.style";

type Option = {
  id: number;
  title: string;
  subtitle: string;
  earningText: string;
};

interface Props {
  options: Array<Option>;
}

function DataCard({ options = [] }: Props) {
  return (
    <View style={[styles.container]}>
      <View style={styles.cardHeader}>
        <Text style={styles.titleStyle}>Data</Text>
        <View style={styles.cardHeaderRight}>
          <Text style={[common.f12, common.T3, common.fw3]}>More</Text>
          <Icon name="chevron-forward" size={14} color="#696F7F" />
        </View>
      </View>
      <View style={styles.cardCryptoList}>
        {options.map((item, index) => {
          const isLast = index === options.length - 1;
          const result = [
            <View style={styles.cardCryptoListItem} key={item.id}>
              <View>
                <Text style={[common.f11, styles.cardCryptoListItemTitle]}>
                  {item.title}
                </Text>
                <Text style={[common.f10, common.T3]}>{item.subtitle}</Text>
                <Text style={[common.mt4, common.f16, common.fw3]}>
                  {item.earningText}
                </Text>
              </View>
            </View>,
            !isLast && (
              <View key={`${item.id}-divider`} style={styles.verticleLine} />
            ),
          ];
          return result;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 15,
    height: 124,
    shadowColor: "rgba(197,196,220,0.25)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 16,
    elevation: 6,
    transform: [{ translateY: 94 }],
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeaderRight: {
    flexDirection: "row",
  },
  cardHeaderRightText: {
    fontSize: 12,
    color: "#696F7F",
  },
  cardCryptoList: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardCryptoListItem: {
    flex: 1,
    flexDirection: "row",
  },
  cardCryptoListItemTitle: {
    color: "#1F2126",
    fontWeight: "600",
  },
  verticleLine: {
    borderColor: "#F6F5FA",
    borderRightWidth: 2,
    marginHorizontal: 20,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default DataCard;

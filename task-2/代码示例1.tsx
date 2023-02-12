/* @flow */

import React from "react";
import type { Element } from "react";
import dayjs from "dayjs";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import type { TextLayoutEvent } from "react-native/Libraries/Types/CoreEventTypes";
import type { VipTaskType } from "app/api/vip";
import {
  alignItems,
  colors,
  fontFamily,
  fontSize,
  height,
  justifyContent,
  lineHeight,
  margin,
  radius,
  width,
} from "app/styles/Common";

//1. 样式的变量经常会很多，这种用法过多占据变量命名，代码编写起来也麻烦，并且每个都声明成变量占据的是多余栈空间，所以增加个 commonStyles 命名空间，并且 esm 下不会影响 treeshakeing;
// 2. Common 不该大写，改为 app/styles/common
import * as commonStyles from "app/styles/common";
import bugsnag from "app/utils/bugsnag";
import helper from "app/utils/helper";
import I18n from "app/utils/i18n";

enum ActionType {
  Internal = "internal",
  External = "external",
}

export type VipNavigationType = {
  type: ActionType.Internal | ActionType.External; // 字符串不可靠，改为枚举
  page: string;
  index: number;
};

const defaultCountdown = 60 * 60 * 1000 * 24; // 直接写成值，在注释里写计算过程，减少 runtime 中计算量；并且要和刀技术的自定义hook 一起拆出去

interface VIPTaskItemComponentProps {
  item: VipTaskType;
  // eslint-disable-next-line flowtype/no-weak-types
  navigation: any;
}

function VIPTaskItemComponent({ item, navigation }: VIPTaskItemComponentProps) {
  // 下面部分抽象成自定义hook，设置值逻辑写的太乱了，光从代码层面比较难看出到底想干嘛，暂不给出正确版本

  // const [time, setTime] = React.useState("");
  // const [toggle, setToggle] = React.useState(true);
  // let isFirst = true;
  // let interval;
  // React.useEffect((): function => {
  //   if (toggle) {
  //     if (isFirst) {
  //       console.log("useEffect isFirst");
  //       updateTime(item);
  //       isFirst = false;
  //     }
  //     interval && clearInterval(interval);
  //     interval = setInterval(() => {
  //       updateTime(item);
  //     }, 1000);
  //   }
  //   return () => {
  //     console.log("clearing interval");
  //     clearInterval(interval);
  //   };
  // }, [toggle]);

  // function updateTime(item: VipTaskType) {
  //   const newTime = dayjs().valueOf();
  //   const expiredTime = item.expiredTime;
  //   if (expiredTime === null || expiredTime === undefined) {
  //     setToggle(false);
  //     return;
  //   }
  //   const interval = expiredTime - newTime;
  //   console.log("updateTime newTime:" + newTime + "interval:" + interval);
  //   if (!interval) {
  //     setToggle(false);
  //     return;
  //   }
  //   if (interval > defaultCountdown) {
  //     setToggle(false);
  //     setTime(
  //       (interval / defaultCountdown).toFixed(0).toString() + I18n.t("days")
  //     );
  //     return;
  //   }
  //   if (interval <= 0) {
  //     setToggle(false);
  //     console.log("product item updateTime interval <= 0");
  //     setTime(I18n.t("vip_task_expired"));
  //     return;
  //   }
  //   if (!toggle) {
  //     setToggle(true);
  //   }
  //   setTime(helper.getCountdownText(interval));
  // }

  const navigationButtonPress = () => {
    try {
      const url: VipNavigationType = JSON.parse(item.url); // 1. url 命名像是字符串，然后是个 Object
      // internal 和 external 的逻辑拆出两个函数，增强可读性
      if (url.type === "internal") {
        // 1. 页面名称字符串抽象成常量，以防改动不一致
        // 将跳转逻辑抽象成 Object 配置，代替 if/else，以及增强可读性
        if (url.page === "ReleaseLongPost") {
          navigation.navigate("ReleaseLongPost", { postType: "normal" });
        } else if (url.page === "Social") {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "TabBarView",
                params: { initialParams: { index: url.index ?? 0 } },
              },
            ],
          });
        } else if (url.page === "News") {
          navigation.reset({
            index: 0,
            routes: [
              { name: "TabBarView", params: { initialParams: { index: 3 } } },
            ],
          });
        } else if (url.page === "Deposit") {
          navigation.reset({
            index: 0,
            routes: [
              { name: "TabBarView", params: { initialParams: { index: 2 } } },
            ],
          });
        } else if (url.page === "Market") {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "TabBarView",
                params: {
                  initialRouteName: "Market",
                  initialParams: { index: url.index ?? 1 },
                },
              },
            ],
          });
        } else {
          navigation.navigate(url.page);
        }
      } else {
        navigation.navigate("WebViewPage", {
          url: url.page,
          TRACK_PARAM: url.page,
        });
      }
      helper.trackEvent("VIP Task Item Click", { USER_ID: global.USER_ID });
    } catch (e) {
      bugsnag.notify(
        new Error(
          "[VIPTaskItem]--[navigationButtonPress]--error:" + e.toString()
        )
      );
    }
  };

  const itemName = item.name; // 只用到一次无需声明成变量，直接 item.name 就行
  const completeThreshold = item.completeThreshold ?? 0;
  const getCompleteProcess = (): string => {
    if (!completeThreshold) {
      return "";
    }
    const process = item.process ?? 0;
    return "(" + process.toString() + "/" + completeThreshold.toString() + ")";
  };
  const taskStatusText = getCompleteProcess() + " ";
  const initPlaceTaskName = itemName + taskStatusText;
  // 函数什么都没做，要删除
  const onTextLayout = (e: TextLayoutEvent) => {
    console.log(
      "VIPTaskItem onTextLayout e.nativeEvent.lines.length:",
      e.nativeEvent
    );
  };
  const isShowExpiredTime =
    item.expiredTime !== null &&
    item.expiredTime !== undefined &&
    completeThreshold > 1 &&
    item.status !== 1;
  return (
    <TouchableOpacity onPress={navigationButtonPress}>
      <View style={styles.container}>
        <View style={styles.leftViewStyle}>
          <View style={styles.taskImageWrapper}>
            {item.icon ? (
              <FastImage style={styles.taskImage} source={{ uri: item.icon }} />
            ) : (
              <FastImage
                style={styles.taskImage}
                source={require("app/images/vip/vip_task_default.webp")}
              />
            )}
          </View>
          <View style={styles.descWrapper}>
            <View style={styles.taskNameWrapper}>
              <Text
                style={styles.taskNameText}
                numberOfLines={4}
                onTextLayout={onTextLayout}>
                {initPlaceTaskName}
                {item.status === 1 ? (
                  <Image
                    style={styles.taskStatusImage}
                    source={require("app/images/vip/vip_task_completed.webp")}
                  />
                ) : null}
              </Text>
            </View>
            <Text style={styles.taskDescText} numberOfLines={4}>
              {"+" +
                (item.amount ?? 0).toString() +
                (I18n.locale === "en" ? " " : "") +
                I18n.t("vip_task_fuel") +
                ", " +
                item.remark}
            </Text>
            {isShowExpiredTime ? (
              <Text style={styles.expiredText}>
                {I18n.t("vip_expired_time") + time}
              </Text>
            ) : null}
          </View>
        </View>
        {item.url ? (
          <View style={styles.arrowWrapper}>
            <FastImage
              style={styles.arrowImage}
              source={require("app/images/arrowRight.webp")}
            />
          </View>
        ) : (
          <View style={styles.arrowWrapper} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.black9,
    borderRadius: radius.r32,
    flexDirection: "row",
    justifyContent: justifyContent.spaceBetween,
    alignItems: alignItems.center,
  },
  leftViewStyle: {
    flexDirection: "row",
  },
  taskImageWrapper: {
    backgroundColor: colors.white19,
    borderRadius: radius.r16,
    alignItems: alignItems.center,
    justifyContent: justifyContent.center,
    marginLeft: margin.m24,
    alignSelf: alignItems.center,
    width: width.w80,
    height: height.h80,
  },
  taskImage: {
    width: width.w38,
    height: height.h38,
  },
  descWrapper: {
    marginLeft: margin.m20,
    marginVertical: margin.m26,
    maxWidth: width.w466,
  },
  taskNameWrapper: {
    flexDirection: "row",
    alignItems: alignItems.center,
    maxWidth: width.w466,
  },
  taskNameText: {
    color: colors.pureWhite,
    fontSize: fontSize.f28,
    fontFamily: fontFamily.bold,
    lineHeight: lineHeight.l40,
  },
  taskStatusImage: {
    width: width.w26,
    height: height.h26,
  },
  taskDescText: {
    color: colors.white17,
    marginTop: margin.m6,
    lineHeight: lineHeight.l33,
    maxWidth: width.w466,
  },
  expiredText: {
    marginTop: margin.m16,
    color: colors.purple,
    fontSize: fontSize.f24,
  },
  arrowWrapper: {
    alignItems: alignItems.center,
    justifyContent: justifyContent.center,
    width: width.w72,
    height: height.h72,
  },
  arrowImage: {
    width: width.w20,
    height: height.h20,
  },
});

// eslint-disable-next-line flowtype/no-weak-types
const VIPTaskItem: any = React.memo(VIPTaskItemComponent);
export default VIPTaskItem;

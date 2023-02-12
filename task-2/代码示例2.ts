try {
  if (Platform.OS !== "web") {
    const groupValue = remoteConfig().getValue("user_group").asString();

    if (groupValue) { // 改为 if (!groupValue) return, 减少一层嵌套。
      const mailSuffix = "@" + (customer.email ?? "").split("@")[1];
      // 解构赋值, 或者直接 customer.XXX直接用，无需声明变量
      const customerId = customer.id;
      const customerEmail = customer.email;
      const customerPhone = customer.phone;
      const customerUserName = customer.userName;
      const groupConfig = JSON.parse(groupValue);
      const groups: string[] = Object.keys(groupConfig);

      groups.forEach((group: string, i: number, array: string[]) => {
        const value = groupConfig[group];
        if (
          value.includes(mailSuffix) ||
          value.includes(customerId) ||
          value.includes(customerPhone) ||
          value.includes(customerEmail) ||
          value.includes(customerUserName)
        ) {
          analytics().setUserProperty("user_group", group);
        } else {
          analytics().setUserProperty("user_group", "public");
        }
      });
    }

    bugsnag.setUser(customer.id, customer.phone, customer.email);
  }
} catch (e) {
  bugsnag.notify(new Error("[home] -- [setUser] -- [error]: " + e.toString()));
}

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            assets: "./assets",
            utils: "./app/utils",
            consts: "./app/consts",
            components: "./app/components",
            style: "./app/style",
          },
        },
      ],
    ],
  };
};

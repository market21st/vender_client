const CracoAlias = require("craco-alias");
const path = require("path");
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "jsconfig",
        jsConfigPath: "jsconfig.paths.json",
      },
    },
  ],
  webpack: {
    alias: {
      "@constants/*": path.resolve(__dirname, "src/components/*"),
      "@assets/*": path.resolve(__dirname, "src/contexts/*"),
      "@config/*": path.resolve(__dirname, "src/config/*"),
      "@layout/*": path.resolve(__dirname, "src/layout/*"),
      "@pages/*": path.resolve(__dirname, "src/pages/*"),
      "@components/*": path.resolve(__dirname, "src/components/*"),
      "@services/*": path.resolve(__dirname, "src/services/*"),
      "@stores/*": path.resolve(__dirname, "src/stores/*"),
      "@utils/*": path.resolve(__dirname, "src/utils/*"),
    },
  },
};

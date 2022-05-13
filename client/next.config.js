const _merge = require("lodash/merge");
const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const colors = require("colors");
const withImages = require("next-images");

//print essentials info
console.log();
console.log("ENV VARS:");
console.log("NODE_ENV=" + colors.cyan(colors.bold(process.env.NODE_ENV)));
console.log(
  "ANALYZE=" +
    (process.env.ANALYZE === "true"
      ? colors.green("enabled")
      : colors.red("disabled"))
);

module.exports = withImages(
  withBundleAnalyzer({
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      const extendConfig = {
        resolve: {
          alias: {
            "@pages": path.resolve("pages/"),
            "@redux": path.resolve("redux/"),
            "@styles": path.resolve("styles/"),
            "@components": path.resolve("components/"),
            "@hooks": path.resolve("hooks/"),
          },
        },
      };

      return _merge(config, extendConfig);
    },
    images: {
      disableStaticImages: true,
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  })
);

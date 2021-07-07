import type Config from "webpack-chain";

const tailwindcss = require("tailwindcss");
const postcssPresetEnv = require("postcss-preset-env");
const tailwindcssNesting = require("tailwindcss/nesting");
const postcssNesting = require("postcss-nesting");

export const configCss = (memo: Config) => {
  const postcssLoaderPath = require.resolve("postcss-loader");
  // css
  const normalCssOneOf = memo.module.rule("css").oneOf("css");
  const modulesCssOneOf = memo.module.rule("css").oneOf("css-modules").before("css").clear();
  const originalCssLoaders = normalCssOneOf.uses.entries();
  const originalModulesCssOneOf = modulesCssOneOf.uses.entries();
  const postcssLoaderOptions = {
    postcssOptions: {
      plugins: [
        tailwindcssNesting(postcssNesting),
        tailwindcss,
        postcssPresetEnv({ features: { "nesting-rules": true } }),
      ],
    },
  };
  originalCssLoaders["postcss-loader"].loader(postcssLoaderPath).options(postcssLoaderOptions);
  originalModulesCssOneOf["postcss-loader"].loader(postcssLoaderPath).options(postcssLoaderOptions);
  modulesCssOneOf.uses.clear();
  modulesCssOneOf
    .test(/\.module\.\w+$/)
    .uses.merge(originalModulesCssOneOf)
    .end();
  // less
  const normaLessOneOf = memo.module.rule("less").oneOf("css");
  const modulesLessOneOf = memo.module.rule("less").oneOf("css-modules").before("css").clear();
  normaLessOneOf
    .use("postcss-loader")
    .before("less-loader")
    .loader(postcssLoaderPath)
    .options(postcssLoaderOptions)
    .end();
  memo.module.rule("less").delete("css-modules");
  modulesLessOneOf
    .test(/\.module\.\w+$/)
    .use("postcss-loader")
    .before("less-loader")
    .loader(postcssLoaderPath)
    .options(postcssLoaderOptions)
    .end();
  // pcss
  memo.module
    .rule("pcss")
    .test(/\.pcss$/)
    .oneOfs.merge(memo.module.rule("css").oneOfs.entries())
    .end();
};

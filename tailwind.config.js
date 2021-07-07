module.exports = {
  mode: "jit",
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: ["./src/**/*.jsx", "./src/**/*.tsx", "./src/**/*.pcss", "./src/**/*.less"],
  theme: {
    extend: {
      minHeight: (theme) => {
        return { ...theme("height") };
      },
    },
    screens: {
      xs: { min: "480px", max: "575px" },
      sm: { min: "576px", max: "767px" },
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1600px",
    },
  },
};

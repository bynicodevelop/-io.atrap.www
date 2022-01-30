const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "warm-gray": colors.stone,
        "twitter-blue": {
          100: "#1DD1F2",
          200: "#1DCBF2",
          300: "#1DC2F2",
          400: "#1DB8F2",
          500: "#1DA1F2",
          600: "#1D93F2",
          700: "#1D8CF2",
          800: "#1D80F2",
          900: "#1D73F2",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-simple-vars': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 0,
    },
    autoprefixer: {},
    'postcss-cssnext': {},
    lost: {},
    'postcss-pxtorem': {},
    cssnano: {},
    'postcss-custom-properties': {
      preserve: false,
    },
  },
}

process.env.VUE_APP_VERSION = require('./package.json').version
module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'manual',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}

const path = require('path');//引入path模块
function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
const httpsFlag = process.env.VUE_APP_URL && process.env.VUE_APP_URL.indexOf('https') > -1
module.exports = {
  publicPath: process.env.VUE_APP_PUBLICPATH,
  //  设置项目域名访问
  //  设置项目域名访问
  devServer: {
    open: true,
    disableHostCheck: true,
    port: '8089',
    https: httpsFlag,
    hotOnly: false,
    proxy: null
  },
  chainWebpack: (config) => {
    config.resolve.alias
        .set('@',resolve('./src'))
        .set('components',resolve('./src/components'))
  },
  productionSourceMap: false
}

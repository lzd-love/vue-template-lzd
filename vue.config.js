/*
 * @Author: lzd
 * @Date: 2020-09-04 08:54:44
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-07 13:35:22
 * @Description: content description
 */
const path = require("path"); //引入path模块
module.exports = {
  outputDir: path.resolve(__dirname, 'dist/'),
  assetsDir: 'static',
  configureWebpack: {
    // output: {
    //   path: path.resolve(__dirname, 'dist/'),
    //   publicPath: "/static/"
    // },
    resolve: {
      alias: {
        "@api": path.resolve(__dirname, "src/api"),
        "@plugins": path.resolve(__dirname, "src/plugins"),
        "@config": path.resolve(__dirname, "src/config")
      }
    }
  },
  pluginOptions: {
    moment: {
      locales: [""]
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "https://192.168.0.146:24684", //目标地址
        ws: false, //// 是否启用websockets
        secure: false, //是否使用https加密 如果后台是非安全证书，关闭加密
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { "^/api": "" } //这里重写路径
      }
    }
  },
  transpileDependencies: ["vue-echarts", "resize-detector"]
};

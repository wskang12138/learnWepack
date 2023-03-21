const webpackMerge = require('webpack-merge') // 合并webpack配置
const baseConfig = require('./webpack.base.conf')
const utils = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 解析html
const portfinder = require('portfinder');//自动查找可用端口
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");//识别某些类的webpack错误，并清除，汇总和优先处理它们
const devWebpackConfig = webpackMerge(baseConfig, {
  plugins: [ // 插件
    new HtmlWebpackPlugin({
      filename: utils.resolve('../dist/index.html'), // html模板的生成路径
      template: './public/index.html', // 模板
      favicon: "./public/favicon.ico",
      inject: true, // true：默认值，script标签位于html文件的 body 底部
    }),
  ],
  stats: 'errors-warnings', // 控制台输出内容
  devtool: 'inline-source-map',
  devServer: {// 开发环境配置
    historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
    hot: true,
    contentBase: false, // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
    // compress: true, //一切服务器都用gzip
    inline: true,
    port: 5500, // 端口
    publicPath: '/', // 前缀
    open: true, // true，打开默认浏览器
    host: "localhost", //设置本地url
    overlay: { // 错误全屏显示
      errors: true,
      warnings: false
    },
    proxy: {
      // // 接口请求代理
      // "/api": {
      //   secure: false,
      //   target: "http://127.0.0.1:8082"
      // }
    },
  }
})
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devWebpackConfig.devServer.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
            ],
            notes: []
          },
          clearConsole: true
        })
      )

      resolve(devWebpackConfig)
    }
  })
})

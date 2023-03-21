const HtmlWebpackPlugin = require("html-webpack-plugin") // 解析html文件
const utils = require("./utils") // 导入公共方法
const webpackMerge = require('webpack-merge') // 合并webpack配置
const baseConfig = require('./webpack.base.conf')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //打包完成，可视化查看每个文件大小
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次打包清理文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js
const CompressionWebpackPlugin = require('compression-webpack-plugin')//压缩为gizp

module.exports = webpackMerge(baseConfig, {
  plugins: [ // 插件
    new HtmlWebpackPlugin({
      filename: utils.resolve('../dist/index.html'), // html模板生成路径
      template: './public/index.html', // 模板
      favicon: "./public/favicon.ico",
      inject: true, // true 默认值 script标签位于body底部
      hash: true, // 打包资源插入html加上hash
      // html文件压缩
      minify: {
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 压缩空间
        removeAttributeQuotes: true // 去除属性 标签的 引号  例如 <p id="test" /> 输出 <p id=test/>
      }
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      deleteOriginalAssets: true,
      test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
      deleteOriginalAssets: true,
      threshold: 10240,
      minRatio: 0.8
     }),
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
  ],

  optimization: { // 优化
    splitChunks: {
      chunks: 'async',//表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为 async
      minSize: 30000,//表示在压缩前的最小模块大小
      maxSize: 0,
      minChunks: 1,//表示被引用次数
      maxAsyncRequests: 5,//按需加载时候最大的并行请求数
      maxInitialRequests: 3,// 一个入口最大的并行请求数
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {//缓存组。缓存组的属性除上面所有属性外
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [  // 压缩css
      new UglifyJsPlugin({
        parallel: true,  //使用多进程并行运行来提高构建速度
        cache: true, // Boolean/String,字符串即是缓存文件存放的路径
        uglifyOptions: {
          warnings: false,
          output: {
            comments: false,   // 使输出的代码尽可能紧凑
            beautify: false  // 输出删掉所有注释
          },
          compress: {
            drop_console: true, // 过滤console,即使写了console,线上也不显示
            drop_debugger: true,
            // warnings:false// UglifyJs版本跟这个没对应上
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.(less)|(css)$/g,
        cssProcessor: require('cssnano'), // 用这个压缩过后更小
        cssProcessorOptions: {
          safe: true,
          discardComments: { removeAll: true }, // 移除注释
          normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
        },
        canPrint: true
      }),
    ]
  },

})
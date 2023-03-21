const utils = require("./utils")
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')// 处理static下面的静态文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css单独文件
const WebpackBar = require('webpackbar'); // 美化webpack控制台输出内容
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: { // 入口
    app: ['./src/index.js']
  },
  output: {// 出口
    path: utils.resolve('../dist'),
    filename: 'static/js/[name]_[hash:6].js',
    publicPath: isDev ? '/' : './', // 打包后资源访问公共路径前缀 
    chunkFilename: 'static/js/[name].[chunkhash:5].chunk.js',
  },
  module: {// 模块
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
        use: {
          loader: 'babel-loader',
          options: {  //用babel-loader需要把es6->es5
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: "automatic" }],  //yarn add @babel/core @babel/preset-react -D
              '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              // '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [isDev ? 'style-loader' : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../../'
          }
        }
        , {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('autoprefixer')
              ]
            }
          }
        },
        ]
      },
      {
        test: /\.less$/,
        exclude:/\.module\.less$/,
        use: [isDev ? 'style-loader' : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../../' //解决打包图片路径不对
          }
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('autoprefixer')
              ]
            }
          }
        },
        {
          loader: 'less-loader',
        },
        ]
      },
      {
        test: /\.module\.less$/,
        use: [isDev ? 'style-loader' : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../../'
          }
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: {
              localIdentName: isDev ? '[path]_[name]__[local]_[hash:base64:5]' : '[local]_[hash:base64:5]', // 模块化css修改样式名称
            }
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('autoprefixer')
              ]
            }
          }
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              module: true
            },
            sourceMap: true,
          }
        },
        {
          loader: 'style-resources-loader',
          options: {
            patterns: [utils.resolve('../src/styles/index.less')]// 全局样式文件 可以用全局变量样式和mixins等
          }
        }
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif|mp3)$/,
        loader: 'url-loader',  // 这里是loader 写use要报错
        options: {
          limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader', // 这里是loader 写use要报错
        options: {
          limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
    alias: {
      '@': path.join(__dirname, '..', "src"), // 在项目中使用@符号代替src路径，导入文件路径更方便
    }
  },
  plugins: [// 插件
    new CopyWebpackPlugin([
      {
        from: utils.resolve('../static'),  // 从哪个目录copy
        to: ".", // copy到那个目录
      }
    ]),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name]_[hash:7].css'),
      chunkFilename: utils.assetsPath('css/[id]_[chunkhash:7].css'),
      ignoreOrder: true
    }),
    new WebpackBar()
  ],

}
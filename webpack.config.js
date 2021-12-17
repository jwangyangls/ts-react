const path = require('path');
const buildPath = 'dist';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, buildPath),
    filename: '[name].[chunkhash].js'
  },
  performance: {
    hints: "warning", // 枚举
    hints: "error", // 性能提示中抛出错误
    hints: false, // 关闭性能提示
    maxAssetSize: 200000, // 整数类型（以字节为单位）
    maxEntrypointSize: 400000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,  //jsx或者tsx文件
        exclude: /(node_modules)/, // 排除node_modules
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|svg|ttf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      title: 'ts-react-starter',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /index\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    })

  ],
  devServer: {
    // contentBase: path.resolve(__dirname, buildPath),
    static: {
      directory: path.resolve(__dirname, buildPath),
    },
    compress: true,
    port: 9000
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

}


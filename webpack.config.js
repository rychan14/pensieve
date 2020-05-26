const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const { DefinePlugin } = require('webpack')

module.exports = (env = {}) => ({
  mode: env.prod ? 'production' : 'development',
  devtool: env.prod ? 'source-map' : 'cheap-module-source-map',
  context: path.resolve(__dirname),
  entry: {
    main: './src/index'
  },
  output: {
    publicPath: 'http://localhost:8082/'
    // path: path.resolve(__dirname, 'dist'),
    // filename: '[name].[hash].js'
  },
  resolve: {
    alias: {
      vue: '@vue/runtime-dom',
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname)
    },
    extensions: ['.ts', '.js', '.vue']
  },
  devServer: {
    open: true,
    port: 8082,
    // hot: true,
    inline: true,
    overlay: true,
    stats: 'minimal',
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-typescript']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'pensieve',
      remotes: {
        chronicler: 'chronicler'
      },
      exposes: {
        AppContainer: './src/App.vue'
      },
      shared: ['vue']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunks: ['main']
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new DefinePlugin(
      {
        'process.env': {
          BASE_URL: '"/"'
        }
      }
    )
  ]
})

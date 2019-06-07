const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.pug$/,
        include: path.join(__dirname, 'src'),
        loaders: 'pug-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: ['file-loader?name=/img/[name].[ext]', 'url-loader'],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: ['file-loader?name=/fonts/[name].[ext]', 'url-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: './src/img',
        to: 'img',
      },
      {
        from: './src/fonts',
        to: 'fonts',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[name]-[chunkhash].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebPackPlugin({
      template: './src/pug/index.pug',
      inject: true,
      filename: './index.html',
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/',
      files: ['./dist/main.css'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}

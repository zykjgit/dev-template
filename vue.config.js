module.exports = {
  publicPath: '/',
  devServer: {
    port: '7777',
    host: '193.168.58.103',
    hot: true,
    proxy: {
      '/': {
        target: 'http://193.168.58.189:8080/zykj-api/operationweb',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
};

module.exports = {
  outputDir: __dirname + '/../server/wwwroot/admin',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/'
}
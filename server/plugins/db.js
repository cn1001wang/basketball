module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.connect('mongodb://1.116.158.210:27017/bbm', {
    useNewUrlParser: true
  })

  require('require-all')(__dirname + '/../models')
}
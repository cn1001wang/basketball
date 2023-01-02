module.exports = async (app) => {
  const mongoose = require('mongoose')
  let client = await mongoose.connect('mongodb://1.116.158.210:27017/bbm', {
    useNewUrlParser: true,
    // useFindAndModify: false,
    auth: {
      authSource: 'admin',
    },
    user: 'wang',
    pass: 'ghelper2018',
  })

  require('require-all')(__dirname + '/../models')
}

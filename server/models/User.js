const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  phone: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      let bcrypt = require('bcrypt')
      const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(val, salt)
    },
  },
  creationTime: { type: Date, default: Date.now },
})

module.exports = mongoose.model("User", schema);

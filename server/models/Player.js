const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  position: {
    type: String,
    enum: ['PG', 'SG', 'SF', 'PF', 'C'],
  },
  height: { type: Number },
  number: { type: Number },
  caption: { type: Boolean },
})

module.exports = mongoose.model('Player', schema)

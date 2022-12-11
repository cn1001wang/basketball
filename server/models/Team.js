const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, requried: true },
  logo: { type: String },
  contactPerson: { type: String },
  contactPhone: { type: String },
  players: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Player' }],
  // players: [
  //   {
  //     name: String,
  //     number: String,
  //     avatar: String,
  //     height: String,
  //     weight: String,
  //     position: String,
  //   },
  // ],
})

module.exports = mongoose.model('Team', schema)

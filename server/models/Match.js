const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  logo: { type: String },
//   games: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Game' }],
  teams: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Team' }],
})
schema.virtual('games', {
  localField: '_id',
  foreignField: 'match',
  justOne: true,
  ref: 'Game'
})

module.exports = mongoose.model('Match', schema)
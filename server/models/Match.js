const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  logo: { type: String },
  teams: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Team' }],
  creatorUserId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  creationTime: { type: Date, default: Date.now },
})
schema.virtual('games', {
  localField: '_id',
  foreignField: 'match',
  justOne: true,
  ref: 'Game',
})

module.exports = mongoose.model('Match', schema)

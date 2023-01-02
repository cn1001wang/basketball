const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  upOrDown: { type: Number },// 1上场，0下场
  player: { type: mongoose.SchemaTypes.ObjectId, ref: 'Player' },
  quarter: { type: Number },
  time: { type: String },
  // teamName: { type: String },
  matchId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Match' },
  teamId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Team' },
  gameId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Game' },
  creatorUserId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  creationTime: { type: Date, default: Date.now },
})

module.exports = mongoose.model('GameTime', schema)

module.exports

const mongoose = require('mongoose')
const GameEventType = require("../enum/gameEventType.js")

const schema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(GameEventType),
  },
  player: { type: mongoose.SchemaTypes.ObjectId, ref: 'Player' },
  quarter: { type: Number },
  time: { type: String },
  // teamName: { type: String },
  matchId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Match' },
  teamId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Team' },
  gameId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Game' },
  creatorUserId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  creationTime: { type: Date, default: Date.now },
})

module.exports = mongoose.model('GameEvent', schema)

module.exports
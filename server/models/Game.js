const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    match: { type: mongoose.SchemaTypes.ObjectId, ref: 'Match' },
    teama: {
      id: { type: mongoose.SchemaTypes.ObjectId, ref: 'Team' },
      color: { type: String },
      activePlayers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Player' }],
      lineup: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Player' }],
      score: { type: Number, default: 0 },
      foulCount: { type: Number, default: 0 },
      suspendCout: { type: Number, default: 0 },
    },
    teamb: {
      id: { type: mongoose.SchemaTypes.ObjectId, ref: 'Team' },
      color: { type: String },
      activePlayers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Player' }],
      lineup: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Player' }],
      score: { type: Number, default: 0 },
      foulCount: { type: Number, default: 0 },
      suspendCout: { type: Number, default: 0 },
    },
    events: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'GameEvent' }],
    dateTime: { type: Date, default: Date.now },
    rule: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rule' },
    place: { type: String },
    creatorUserId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    creationTime: { type: Date, default: Date.now },
    status:{type:Number,default:0},// 0 进行中，1已结束
    // 进行到第几节
    section: { type: Number, default: 1 },
    // 进行到第几分钟
    countdown: { type: String },
  },
)

// events

module.exports = mongoose.model('Game', schema)

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
    },
    teamb: {
      id: { type: mongoose.SchemaTypes.ObjectId, ref: 'Team' },
      color: { type: String },
      activePlayers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Player' }],
      lineup: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Player' }],
      score: { type: Number, default: 0 },
    },
    events: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'GameEvent' }],
    dateTime: { type: Date, default: Date.now },
    rule: { type: mongoose.SchemaTypes.ObjectId, ref: 'Rule' },
    place: { type: String },
    creatorUserId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    creationTime: { type: Date, default: Date.now },
    status:{type:Number,default:0}// 0 进行中，1已结束
    // 结果
  },
  {
    toJSON: { virtuals: true }, // 转换成 JSON 时加入虚拟字段
  }
)

// events

module.exports = mongoose.model('Game', schema)

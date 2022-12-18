const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  // 常规时间节数
  quarterNumber: { type: Number, default: 4 },
  // 每节比赛时间
  timeOfEach: { type: Number, default: 10 },
  // 节间休息时间
  quarterRestTime: { type: Number, default: 2 },
  // 半场休息时间
  halftimeRestTime: { type: Number, default: 15 },
  // 加时赛休息时间
  overtimeRestTime: { type: Number, default: 2 },
  // 加时赛时间
  timeOfOvertime: { type: Number, default: 5 },

  // 个人犯规限制次数
  personalFoulLimit: { type: Number, default: 4 },
  // 单节全队累计犯规加罚
  quarterFoulLimit: { type: Number, default: 4 },

  // 上半场暂停次数
  firstHalfPauseTime: { type: Number, default: 2 },
  // 下半场暂停次数
  secondHalfPauseTime: { type: Number, default: 3 },
  // 加时赛暂停次数
  overtimePauseTime: { type: Number, default: 1 },
  // 每次暂停时间 秒
  pauseDuration: { type: Number, default: 60 },
  creatorUserId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  creationTime: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Rule', schema)

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  // 常规时间节数
  quarterNumber: { type: Number, default: 4 },
  // 每节比赛时间
  eachTime: { type: Number, default: 4 },
  // 节间休息时间
  quarterRestTime: { type: Number, default: 2 },
  // 半场休息时间
  halftimeRestTime: { type: Number, default: 15 },
  // 加时赛时间
  halftimeRestTime: { type: Number, default: 15 },
  // 加时赛时间
  LimitsOfFouls: { type: Number, default: 4 },
  // 每次暂停时间 秒
  pauseDuration: { type: Number, default: 60 },

  // 个人犯规限制次数
  personalFoulLimit: { type: Number, default: 4 },
  // 单节全队累计犯规加罚
  quarterFoulLimit: { type: Number, default: 4 },
});

module.exports = mongoose.model("Rule", schema);

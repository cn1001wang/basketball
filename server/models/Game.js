const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  match: { type: mongoose.SchemaTypes.ObjectId, ref: "Match" },
  teama: { type: mongoose.SchemaTypes.ObjectId, ref: "Team" },
  teamb: { type: mongoose.SchemaTypes.ObjectId, ref: "Team" },
  dateTime: { type: Date, default: Date.now },
  rule: { type: mongoose.SchemaTypes.ObjectId, ref: "Rule" },
  place: { type: mongoose.SchemaTypes.ObjectId, ref: "Place" },
  // 结果
});

// events

module.exports = mongoose.model("Game", schema);

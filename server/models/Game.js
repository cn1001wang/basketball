const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  match: { type: mongoose.SchemaTypes.ObjectId, ref: "Match" },
  teama:{
    id:{ type: mongoose.SchemaTypes.ObjectId, ref: "Team" },
    color:{type:String},
    activePlayers:[{type:mongoose.SchemaTypes.ObjectId,ref:"Player"}],
    lineup:[{type:mongoose.SchemaTypes.ObjectId,ref:"Player"}],

  },
  teamb:{
    id:{ type: mongoose.SchemaTypes.ObjectId, ref: "Team" },
    color:{type:String},
    activePlayers:[{type:mongoose.SchemaTypes.ObjectId,ref:"Player"}],
    lineup:[{type:mongoose.SchemaTypes.ObjectId,ref:"Player"}],
  },
  events:[{type:mongoose.SchemaTypes.ObjectId,ref:"GameEvent"}],
  dateTime: { type: Date, default: Date.now },
  rule: { type: mongoose.SchemaTypes.ObjectId, ref: "Rule" },
  place: { type: mongoose.SchemaTypes.ObjectId, ref: "Place" },
  // 结果
});

// events

module.exports = mongoose.model("Game", schema);

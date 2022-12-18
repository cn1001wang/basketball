const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: { type: String, requried: true },
    logo: { type: String },
    contactPerson: { type: String },
    contactPhone: { type: String },
    creatorUserId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    creationTime: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true }, // 转换成 JSON 时加入虚拟字段
  }
)

schema.virtual('players', {
  localField: '_id',
  foreignField: 'teamId',
  justOne: false,
  ref: 'Player',
})

module.exports = mongoose.model('Team', schema)

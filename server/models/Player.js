const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: { type: String },
    avatar: { type: String },
    position: {
      type: String,
      // enum: ['PG', 'SG', 'SF', 'PF', 'C'],
    },
    height: { type: String },
    weight: { type: String },
    number: { type: String },
    caption: { type: Boolean },
    age: { type: String },
    remarks: { type: String },
    teamId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Team' },
    creatorUserId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    creationTime: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true }, // 转换成 JSON 时加入虚拟字段
  }
)

schema.virtual('team', {
  localField: 'teamId',
  foreignField: '_id',
  justOne: true,
  ref: 'Team',
})
module.exports = mongoose.model('Player', schema)

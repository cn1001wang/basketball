const mongoose = require('mongoose')

const GameEventType = {
  罚球: '1points',
  两分: '2points',
  三分: '3points',
  罚球未进: 'loss1points',
  两分未进: 'loss2points',
  三分未进: 'loss3points',
  犯规: 'foul',
  技术犯规: 'technicalFoul',
  违体犯规: 'flagrantFoul',
  失误: 'turnover',
}

const schema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(GameEventType),
  },
  player: { type: mongoose.SchemaTypes.ObjectId, ref: 'Player' },
  quarter: { type: Number },
  time: { type: String },
})

module.exports = mongoose.model('GameEvent', schema)

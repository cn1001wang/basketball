const mongoose = require('mongoose')
module.exports = async function (req, res) {
  var ObjectId = mongoose.Types.ObjectId
  const { matchId } = req.query

  // .find({ match: matchId })
  //   .populate('teama.id')
  //   .populate('teamb.id', 'name')
  const items = await req.Model.aggregate([
    { $match: { match: new ObjectId(matchId) } },
    { $sort: { dateTime: -1 } },
    {
      // join
      $lookup: {
        from: 'teams',
        localField: 'teama.id',
        foreignField: '_id',
        as: 'teama.team',
      },
    },
    {
      // join
      $lookup: {
        from: 'teams',
        localField: 'teamb.id',
        foreignField: '_id',
        as: 'teamb.team',
      },
    },
    {
      $unwind: '$teama.team',
    },
    {
      $unwind: '$teamb.team',
    },
  ]).limit(100)

  res.send(items)
  return
}

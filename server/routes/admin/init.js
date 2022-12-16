module.exports = function (app) {
  app.get('/admin/api/init/rule', async (req, res) => {
    var modal = require(`../../models/Rule`)
    // await modal.deleteMany({})
    var rule = {
      name: 'FIBA 5×5比赛规则',
      quarterNumber: 4,
      timeOfEach: 10,
      quarterRestTime: 2,
      halftimeRestTime: 15,
      overtimeRestTime: 2,
      timeOfOvertime: 5,
      pauseDuration: 60,
      timeOfOvertime: 60,

      personalFoulLimit: 4,
      quarterFoulLimit: 4,

      firstHalfPauseTime: 2,
      secondHalfPauseTime: 3,
      overtimePauseTime: 1,
      pauseDuration: 60,
      creatorUserId:"639c82240c062a612110ab62"
    }
    var data=await modal.create(rule)
    rule._id=data._id

    res.send(rule)
  })

  app.get('/admin/api/init/user', async (req, res) => {
    var modal = require(`../../models/User`)
    // await modal.deleteMany({})
    var user = { username: 'user1', password: '123456' }
    await modal.create(user)

    res.send(user)
  })
}

const express = require('express')
const mongoose = require('mongoose')
const assert = require('http-assert')
module.exports = function (app) {
  const router = express.Router({
    mergeParams: true,
  })
  router.post('/endGame', async (req, res) => {
    const gameEventType = require('../../enum/gameEventType.js')
    assert(req.Model.modelName === 'Game', 404, '错误地址')

    const Game = require('../../models/Game')
    const { gameId } = req.query
    //  teama.activePlayers  teamb.activePlayers
    let game = await Game.findById(gameId).populate('teama.id teamb.id rule match events')
    const events = game.events
    function getScore(teamId) {
      let teamEvents = events.filter((o) => o.teamId.equals(teamId))
      return (
        teamEvents.filter((o) => o.type === gameEventType.罚球).length +
        teamEvents.filter((o) => o.type === gameEventType.两分).length * 2 +
        teamEvents.filter((o) => o.type === gameEventType.三分).length * 3
      )
    }
    function getFoulEvents(teamId) {
      let teamEvents = game.events.filter((o) => o.teamId.equals(teamId))
      return teamEvents.filter((o) =>
        [gameEventType.犯规, gameEventType.技术犯规, gameEventType.违体犯规].includes(o.type)
      ).length
    }
    function getSuspendEvents(teamId) {
      let teamEvents = game.events.filter((o) => o.teamId.equals(teamId))

      return teamEvents.filter((o) => [gameEventType.暂停].includes(o.type)).length
    }

    let obj = {
      status: 1,
      teama: {
        id: game.teama.id._id,
        color: game.teama.color,
        activePlayers: game.teama.activePlayers,
        lineup: game.teama.lineup,
        score: getScore(game.teama.id._id),
        foulCount: getFoulEvents(game.teama.id._id),
        suspendCout: getSuspendEvents(game.teama.id._id),
      },
      teamb: {
        id: game.teamb.id._id,
        color: game.teamb.color,
        activePlayers: game.teamb.activePlayers,
        lineup: game.teamb.lineup,
        score: getScore(game.teamb.id._id),
        foulCount: getFoulEvents(game.teamb.id._id),
        suspendCout: getSuspendEvents(game.teamb.id._id),
      },
    }
    const model = await req.Model.findByIdAndUpdate(req.params.id, {place:"北大"})

    res.send(obj)
  })

  // 创建资源
  router.post('/', async (req, res) => {
    req.body.creatorUserId = req.user._id
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true,
    })
  })
  // 资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {
      where: {
        creatorUserId: req.user._id,
      },
    }
    if (req.Model.modelName === 'Team') {
      queryOptions.populate = 'players agames bgames'
    } else if (req.Model.modelName === 'Rule') {
      const items = await req.Model.find({ $or: [{ creatorUserId: req.user._id }, { creatorUserId: null }] }).limit(100)
      res.send(items)
      return
    } else if (req.Model.modelName === 'Game') {
      require('./game')(req, res)
      return
    }

    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  // 资源详情
  router.get('/getById/:id', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Team') {
      queryOptions.populate = 'players'
    } else if (req.Model.modelName === 'Player') {
      queryOptions.populate = 'team'
    } else if (req.Model.modelName === 'Game') {
      queryOptions.populate = 'teama.id teamb.id rule match events teama.activePlayers  teamb.activePlayers'
    }
    const model = await req.Model.findById(req.params.id)
      .where({
        creatorUserId: req.user._id,
      })
      .setOptions(queryOptions)
    res.send(model)
  })

  router.get('/getEventsByGameId', async (req, res) => {
    var ObjectId = mongoose.Types.ObjectId
    assert(req.Model.modelName === 'GameEvent', 404, '错误地址')
    const { gameId } = req.query
    let model = await req.Model.find({ gameId: ObjectId(gameId) }).populate('player')

    res.send(model)
  })

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
}

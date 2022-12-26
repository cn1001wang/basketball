const express = require('express')
const mongoose = require('mongoose')
const assert = require('http-assert')
module.exports = function (app) {
  const router = express.Router({
    mergeParams: true,
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
      queryOptions.populate = 'players'
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
    let model = await req.Model.find({gameId:ObjectId(gameId)}).populate('player')

    res.send(model)
  })

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
}

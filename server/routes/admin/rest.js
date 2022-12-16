const express = require('express')
const { equal } = require('http-assert')
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
      const { matchId } = req.body
      const items = await req.Model.find().limit(100)
      res.send(items)
      return
    }

    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  // 资源详情
  router.get('/:id', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Team') {
      queryOptions.populate = 'players'
    } else if (req.Model.modelName === 'Player') {
      queryOptions.populate = 'team'
    }
    const model = await req.Model.findById(req.params.id)
      .where({
        creatorUserId: req.user._id,
      })
      .setOptions(queryOptions)
    res.send(model)
  })

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
}

module.exports = (app) => {
  const express = require('express')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const rest = require('./rest.js')
  rest(app)

  const multer = require('multer')
  const MAO = require('multer-aliyun-oss')
  const upload = multer({
    // dest: __dirname + '/../../uploads',
    storage: MAO({
      config: {
        region: 'oss-cn-zhangjiakou',
        accessKeyId: '替换为你的真实id',
        accessKeySecret: '替换为你的真实secret',
        bucket: 'node-vue-moba',
      },
    }),
  })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    // file.url = `http://test.topfullstack.com/uploads/${file.filename}`
    res.send(file)
  })

  app.get('/admin/api/userInit', async (req, res) => {
    var modal = require(`../../models/AdminUser`)
    await modal.deleteMany({})
    var user = { username: 'admin', password: '123456' }
    await modal.create(user)

    res.send(user)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户

    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message,
    })
  })
}

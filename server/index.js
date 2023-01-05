const express = require("express")
var history = require('connect-history-api-fallback');
const app = express()
app.use(history());
app.set('secret', 'fasd54sdcf276f')
var corsOptions = {
  origin: 'http://localhost:8000',
}
app.use(require('cors')())
app.use(express.json())
app.use('/', express.static(__dirname + '/wwwroot/h5'))
// app.use('/admin', express.static(__dirname + '/wwwroot/admin'))
app.use('/uploads', express.static(__dirname + '/wwwroot/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
// require('./routes/web')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
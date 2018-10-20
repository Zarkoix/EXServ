const express = require('express')
var v1 = require('./v1')
const app = express()
const port = 3000 // TODO: move this to use env variable if exists

app.use('/v1', v1)

app.get('/', (req, res) => res.send('EXServ'))

app.listen(port, () => console.log(`EXServ listening on port ${port}!`))

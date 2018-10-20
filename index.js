const express = require('express')
const app = express()
const port = 3000 // TODO: move this to use env variable if exists

app.get('/v1/face', (req, res) => {
    // TODO: map to file
})

app.get('/v1/audio', (req, res) => {
    // TODO: map to file
})

app.get('/', (req, res) => res.send('EXServ'))

app.listen(port, () => console.log(`EXServ listening on port ${port}!`))

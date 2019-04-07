const express = require('express')
var path = require('path');

require('dotenv').config({
    path: path.join(__dirname, 'config', 'app.env')
})

const app = express()

require('./web/routing/base.router')(app)

app.listen(process.env.PORT, () => {
    console.log(
        `Server was started at http://localhost:${process.env.PORT}`
    )
})
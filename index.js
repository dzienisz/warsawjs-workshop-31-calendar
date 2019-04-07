var path = require('path');
const express = require('express')

require('dotenv').config({
    path: path.join(__dirname, 'config', 'app.env')
})

const app = express()

app.listen(process.env.PORT, () => {
    console.log(
        `Server was started at http://localhost:${process.env.PORT}`
    )
})
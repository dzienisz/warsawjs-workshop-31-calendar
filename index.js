const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const { connect } = require('./db')

require('dotenv').config({
    path: path.join(__dirname, 'config', 'app.env')
})

const app = express()

// Midlewares
app.use(bodyParser.json())

// Routing
require('./web/routing/base.router')(app)
require('./web/routing/calendar.router')(app)
require('./web/routing/event.router')(app);

(async () => {

    await connect();

    // Start web server
    app.listen(process.env.PORT, () => {
        console.log(
            `Server was started at http://localhost:${process.env.PORT}`
        )
    });

})();
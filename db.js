const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config({
    path: path.join(__dirname, 'config', 'db.env')
});

const options = { useNewUrlParser: true };
const connectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

module.exports = {
    connect() {
        return mongoose.connect(connectionString, options);
    }
};
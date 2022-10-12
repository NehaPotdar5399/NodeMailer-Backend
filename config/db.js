const mongoose = require("mongoose");
require('dotenv').config();


var uri =process.env.uri;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).catch('connection failed');

const connection = mongoose.connection;

module.exports = connection;
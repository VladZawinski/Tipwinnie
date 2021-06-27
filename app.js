const app = require('express')();
const mongoose = require('mongoose');

require('dotenv').config()

mongoose.connect(process.env.ATLAS_URL,{
     useNewUrlParser: true,
     useUnifiedTopology: true
});

const db = mongoose.connection

db.on('error', e => console.log(e))
db.once('open', function () {
     console.log('Connected to database!');
})






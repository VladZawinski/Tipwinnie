const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

// DB
mongoose.connect(process.env.ATLAS_URL,{
     useNewUrlParser: true,
     useUnifiedTopology: true
});

const db = mongoose.connection

db.on('error', e => console.log(e))
db.once('open', function () {
     console.log('Connected to database!');
})

// Middlewares and Routes
const {scraper,tips} = require('./routes')

app.use(express.json())
app.use('/scraper',scraper)
app.use('/api',tips)

app.get('/',async (req,res) => {
     let result = await require('./scraper/viptip').fetchTodayTips()
     res.send(result)
});

app.listen(8080, () => {
     console.log(`Server started listening`);
})






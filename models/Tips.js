const mongoose = require('mongoose');
const { Schema } = mongoose;

const tipSchema = new Schema({
     match: {
          home: String,
          away: String,
     },
     dateOfTips: String,
     goals: {
          home: {
               type: Number,
               default: 1080
          },
          away: {
               type: Number,
               default: 1080
          }
     },
     result: {
          type: String,
          default: 'pending'
     },
     tip: String,
     sofascoreLink: {
          type: String,
          default: ""
     }
}, { versionKey: false});


module.exports = mongoose.model('Tips',tipSchema);
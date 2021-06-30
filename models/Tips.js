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
     markAs: {
          type: String,
          default: 'ordinary'
     },
     result: {
          type: String,
          default: 'pending'
     },
     tip: String,
     tipBy: {
          type: String,
          default: "vip"
     },
}, { versionKey: false , timestamps: { createdAt: 'createdAt'}});


module.exports = mongoose.model('Tips',tipSchema);
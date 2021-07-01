const { each } = require('cheerio/lib/api/traversing');
const moment = require('moment');
const Tips = require('../models/Tips');

exports.fetchAllTips = async (req,res) => {
     
          Tips.find({})
          .sort('-createdAt')
          .find(function (err, result) {
               if(!err){
                    res.send({
                         success: true,
                         tips: result
                    });
               }
          }).catch(err => {
               res.send({
                    success: false,
                    message: err.message
               })
          });
          
}

exports.updateScore = async (req, res) => {
     let { id,home,away } = req.body;

     try {
          const updatedTip = await Tips.findByIdAndUpdate(id, { 
               $set: { 'goals.home': home, 'goals.away':away } 
          },{new: true})

          res.json({
               success: true,
               updatedTip
          });

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error
          });
     }
}

exports.updateResult = async (req,res) => {
     let {id,markAs} = req.query;

     try {
          const updatedTip = await Tips.findByIdAndUpdate(id, { 
               $set: { 'result': markAs}
          },{new: true})

          res.json({
               success: true,
               updatedTip
          });

     } catch (error) {
          res.status(500).json({
               success: false,
               message: error
          });
     }
}

exports.addManually = async (req,res) => {
     let {home,away,tip} = req.body;

     try {
          const _tip = new Tips({
               match: {
                    home,
                    away
               },
               tip,
     
          });

          const apk = await _tip.save()

          res.send({
               success: true,
               message: "Your match is saved!"
          });
     } catch (error) {
          res.status(500).send({
               success: false,
               message: error.message
          })
     }
}

exports.bulkAdd = async (req,res) => {
     let {tips} = req.body;
     console.log(tips);
     try {
          await Tips.insertMany(tips)
          res.json({
               message: "Bulk add successfully!"
          })
     } catch (error) {
          res.json({
               message: error.message
          })
     }
}

exports.fetchCommonPicks = async (req,res) => {
     res.json(require('../utils/picks').picks)
}

exports.markBadge = async (req,res) => {
     try {
          let {id,markAs} = req.query;

          const tip = await Tips.findByIdAndUpdate(id,{
               $set: {markAs}
          },{new: true})

          res.send({
               success: true,
               updatedTip: tip
          });
     } catch (error) {
          res.send({
               success: false,
               message: error.message
          })
     }
}

exports.findDistinctDates = async (req,res) => {
     try {
          let dates = await Tips.find({}).sort('-createdAt').select('createdAt -_id')
          let duplicatedDates = dates.map(element => moment(new Date(element.createdAt)).format('yyyy-MM-DD'));
          res.send({
               success: true,
               dates: duplicatedDates.filter(onlyUnique)
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message
          })
     }
}

exports.findPicksByDate = async (req,res) => {
     try {
          let {date} = req.query;

          let result = await Tips.find({
               createdAt: {
                    $gte:moment(date).startOf('day').toDate(),
                    $lte:moment(date).endOf('day').toDate()
               }
          }).sort('-createdAt');

          res.send({
               success: true,
               data: result
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message
          })    
     }
}

// You can use aggregate
exports.getRecapOfTheDay = async (req,res) => {
     try {
          let {date} = req.query;

          let result = await Tips.find({
               createdAt: {
                    $gte:moment(date).startOf('day').toDate(),
                    $lte:moment(date).endOf('day').toDate()
               }
          }).select('result');

          let totalCount = result.length
          let winCount = result.filter(e => e.result === "win").length
          let loseCount = result.filter(e => e.result === 'lose').length

          res.send({
               success: true,
               data: {
                    win: winCount,
                    lose: loseCount,
                    pending: totalCount - (winCount + loseCount),
                    total: totalCount
               }
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message
          })    
     }
}

function onlyUnique(value, index, self) {
     return self.indexOf(value) === index;
}
   
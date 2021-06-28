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
     let {home,away,tip,date} = req.body;

     try {
          const _tip = new Tips({
               match: {
                    home,
                    away
               },
               tip,
               dateOfTips: date
          });

          const apk = await _tip.save()
          console.log(apk);

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

exports.fetchCommonPicks = async (req,res) => {
     res.json(require('../utils/picks'))
}
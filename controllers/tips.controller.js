const Tips = require('../models/Tips');

exports.fetchAllTips = async (req,res) => {
     try {
          let result = await Tips.find({});
          res.send({
               success: true,
               tips: result
          });
     } catch (error) {
          res.send({
               success: false,
               message: error.message
          })
     }

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
const router = require('express')();
const tipScraper = require('../scraper/viptip');
const Tips = require('../models/Tips')

/**
 * Bulk insert all tips
 */
router.post('/scrape/tips', async (req, res) => {
     try {
          let result = await tipScraper.fetchTodayTips()
          
          let isExist = await Tips.findOne({dateOfTips: result.tips[0].dateOfTips})
          
          if(!isExist){
               await Tips.insertMany(result.tips);
               return res.json({
                    message: "Save successfully!"
               })
          }

          return res.json({message: "Data have already scraped"})
          
     } catch (error) {
          console.log(error);
     }
})

/**
 * Delete all by date
 */
router.post('/delete/tips', async (req,res) => {
     let {date} = req.body

     try {
          await Tips.deleteMany({dateOfTips: date});
          return res.json({
               message: "Delete successfully!"
          })
     } catch (error) {
          res.send(error)
     }

})

module.exports = router
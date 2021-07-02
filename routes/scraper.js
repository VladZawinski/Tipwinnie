const router = require('express')();
const tipScraper = require('../scraper/viptip');
const footballReportScraper = require('../scraper/afootballreport')
const over25TipsScraper = require('../scraper/over25tips');
const betzoid = require('../scraper/betzoid');
const Tips = require('../models/Tips')

/**
 * Bulk insert all tips
 */
router.post('/scrape/tips', async (req, res) => {
     try {
          let result = await tipScraper.fetchVipTips()
          let mappedResult = result.tips.map((e, index) => {
               e.tipBy = "VIP Betting Tips"
               return e;
          });

          let isExist = await Tips.findOne({ dateOfTips: mappedResult[0].dateOfTips })

          if (!isExist) {
               await Tips.insertMany(mappedResult);
               return res.json({
                    message: "Save successfully!"
               })
          }

          return res.json({ message: "Data have already scraped" })

     } catch (error) {
          console.log(error);
     }
})

router.post('/scrape/afootballreport', async (req, res) => {
     try {
          let result = await footballReportScraper.fetchThreeTypesOfPick()

          let picks = result.map((e, index) => {
               return {
                    match: {
                         home: e.home,
                         away: e.away,
                    },
                    tipBy: "A Football Report",
                    tip: e.tip
               };
          });
          
          await Tips.insertMany(picks);

          res.send({
               success: true,
               message: 'Data scraped successfully!'
          })

     } catch (error) {
          res.send({
               success: false,
               message: error.message
          })
     }
})

router.post('/scrape/over25tips',async (req,res) => {
     try {
          let result = await over25TipsScraper.fetchOver25Tips();

          await Tips.insertMany(result);

          res.send({
               success: true,
               message: 'Data scraped successfully!'
          });
     } catch (error) {
          res.send({
               success: false,
               message: error.message
          });
     }
})

router.post('/scrape/betzoid',async (req,res) => {
     try {
          let result = await betzoid.fetchCornerPicks();

          await Tips.insertMany(result);

          res.send({
               success: true,
               message: 'Data scraped successfully!'
          });
     } catch (error) {
          res.send({
               success: false,
               message: error.message
          });
     }
})

/**
 * Delete all by date
 */
router.post('/delete/tips', async (req, res) => {
     let { date } = req.body

     try {
          await Tips.deleteMany({ dateOfTips: date });
          return res.json({
               message: "Delete successfully!"
          })
     } catch (error) {
          res.send(error)
     }

})

module.exports = router
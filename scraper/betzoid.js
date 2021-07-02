const axios = require('axios');
const cheerio = require('cheerio');

exports.fetchCornerPicks = async (req,res) => {
     let body = await axios.get('https://betzoid.com/total-corner-betting-tips/');
     let $ = cheerio.load(body.data);

     let statContainers = $('.match-table .match-table__body .match-table__tr');
     let tips = [];

     statContainers.each((index,e) => {
          let stat = $(e);
          let teamContainers = stat.find('.match-table__td_game .match-table__game')
          let home = $(teamContainers[0]).find('.match-table__game-title').text()
          let away = $(teamContainers[1]).find('.match-table__game-title').text()
          let tip = stat.find('.match-table__td_ratio .match-table__game-title').text()

          tips.push({
               match: {
                    home,
                    away
               },
               tip: `Corner o${tip}`,
               tipBy: 'Betzoid',
          })
     })
     
     return tips;
}

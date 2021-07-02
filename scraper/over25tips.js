const axios = require('axios');
const cheerio = require('cheerio');

exports.fetchOver25Tips = async function() {
     let body = await axios.get('https://www.over25tips.com/');
     let $ = cheerio.load(body.data);

     let todayTipsContainer = $('.predictionsTable').first()
     let container = todayTipsContainer.find('tbody > tr')
     let tips = [];

     container.each((index, e) => {
          if (index !== 0 || index > 10) {
               let container = $(e)
               let home = container.find('.COL-3').text().trim()
               let away = container.find('.COL-5').text().trim()
               let probability = container.find('.percent25').text().trim()

               tips.push({
                    match: {
                         home,
                         away
                    },
                    tip: 'Over 2.5',
                    tipBy: 'Over25tips',
                    probability
               })
          }
     });

     return tips;

}
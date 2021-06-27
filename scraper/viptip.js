const axios = require('axios');
const cheerio = require('cheerio');

exports.fetchTodayTips = async function() {
     const body = await axios.get('http://www.shortclouddesign.com/1vip/vip1.html');
     const $ = cheerio.load(body.data);

     const container = $('#Tahmin')
     const todayTipContainer = container.find('div').first()
     const tips = $(todayTipContainer).find('table')
     // All tips 
     const todayTips = []
     var dateOfTips = ""

     tips.each((index,element) => {
          const tip = $(element);
          switch(index){

               case 0: 
                    dateOfTips = tip.find('th').text()
                    break;
               case 1: break;
               
               default: 
                    const match = tip.find('.mac').text();
                    const prediction = tip.find('.sonuc').text().split(' / ')
                    let footballTip = prediction[1]
                    
                    todayTips.push({
                         match: getTeam(match),
                         tip: footballTip.trim()
                    })
                    break;
          }

     });

     let mappedTips = todayTips.map(e => {
          e.dateOfTips = dateOfTips
          return e;
     });

     return {
          tips: mappedTips
     }
}


function getTeam(match){
     let teams = match.split(' - ')
     return {
          home: teams[0],
          away: teams[1]
     }
}

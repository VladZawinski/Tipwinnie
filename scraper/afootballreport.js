const axios = require('axios');
const cheerio = require('cheerio');


exports.fetchThreeTypesOfPick =  async function(){
     let over25Picks = await crawlAFootballReport('https://afootballreport.com/predictions/over-2.5-goals/','Over 2.5')
     let bttsPicks = await crawlAFootballReport('https://afootballreport.com/predictions/btts/','BTTS')
     let over15Picks = await crawlAFootballReport('https://afootballreport.com/predictions/over-1.5-goals/','Over 1.5')
    
     over25Picks.push(...bttsPicks)
     over25Picks.push(...over15Picks)

     return over25Picks;
}

async function crawlAFootballReport (url,type) {
     const winLostBody = await axios.get(url)

     let $ = cheerio.load(winLostBody.data);

     let stats = $('.page-section tbody tr')
     let picks = [];

     stats.each((index,e) => {
          if(index < 5){
               let match = $(e)
               let homeTeam = match.find('.home-team').text()
               let awayTeam = match.find('.away-team').text()
               
               picks.push({
                    home: homeTeam,
                    away: awayTeam,
                    tip: type,
               }) 
          }
     })

     return picks;
}

const axios = require('axios');
const cheerio = require('cheerio');

exports.fetchTodayTips = async function() {
     const body = await axios.get('http://www.shortclouddesign.com/1vip/vip1.html');
     const $ = cheerio.load(body.data);

     const container = $('#Tahmin')
     const todayTipContainer = container.find('div').first()
     const tips = $(todayTipContainer).find('table')
     const todayTips = []

     tips.each((index,element) => {
          const tip = $(element);

          switch(index){
               case 0: 
                    const dateOfTips = tip.find('th').text()
                    break;
               case 1: break;
               
               default: 
                    const match = tip.find('.mac').text();
                    const prediction = tip.find('.sonuc').text().split('/')
                    let footballTip = prediction[1]
                    
                    todayTips.push({
                         match,
                         tip: footballTip.trim()
                    })
                    break;
          }

          // if(index === 0){
               
          // }else if(index === 1){
          //      // Do nothing
          // }else {
          //      const match = tip.find('.mac').text();
          //      const prediction = tip.find('.sonuc').text().split('/')
          //      let footballTip = prediction[1]
               
          //      todayTips.push({
          //           match,
          //           tip: footballTip.trim()
          //      })
          // }

     });

     console.log(todayTips.length);
     console.log(todayTips);
}
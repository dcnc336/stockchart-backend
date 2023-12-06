const axios = require('axios');
const cron = require('node-cron');
const socketIO = require('./socketIO');


/******************************************** daily options ****************************************************/ 
// const options = {
//     method: 'GET',
//     url: 'https://alpha-vantage.p.rapidapi.com/query',
//     params: {
//       function: 'TIME_SERIES_DAILY_ADJUSTED',
//       symbol: 'MSFT',
//       outputsize: 'compact',
//       datatype: 'json'
//     },
//     headers: {
//       'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
//       'X-RapidAPI-Host': process.env.X_RapidAPI_Host
//     }
// };

/********************************************Fom mintime options **********************************************/

const getTimeSeriesIntraday = async(val) => {
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {
        interval: `${val}min`,
        function: 'TIME_SERIES_INTRADAY',
        symbol: 'MSFT',
        datatype: 'json',
        output_size: 'compact'
      },
      headers: {
        'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
        'X-RapidAPI-Host': process.env.X_RapidAPI_Host
      }
    };
    try {
        const response = await axios.request(options);
        if ( response.data ){
            socketIO.getInstance().emit('submit_daily_data', JSON.stringify(response.data[`Time Series (${val}min)`]));
        }
    } catch (error) {
        console.error(error);
    }
}
const circleReq = {
    init:()=>{
        getTimeSeriesIntraday(15);
        cron.schedule('*/15 * * * *', () => {
            var d = new Date();
            console.log(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
            getTimeSeriesIntraday(15);
        });
    }
}

module.exports = circleReq;
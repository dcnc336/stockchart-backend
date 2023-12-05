const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://alpha-vantage.p.rapidapi.com/query',
//   params: {
//     interval: '60min',
//     function: 'TIME_SERIES_INTRADAY',
//     symbol: 'MSFT',
//     datatype: 'json',
//     output_size: 'compact'
//   },
//   headers: {
//     'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
//     'X-RapidAPI-Host': process.env.X_RapidAPI_Host
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }

// function logMessage() {
    //  console.log('Cron job executed at:', new Date().toLocaleString());
    // }
    // // Schedule the cron job to run every minute
    // cron.schedule('* * * * *', () => {
        //  logMessage();
        // });

const cron = require('node-cron');
const getTimeSeriesIntraday = () => {
    console.log('ajajajajajjajaja');
}
const circleReq = {
    init:()=>{
        cron.schedule('* * * * *', () => {
            getTimeSeriesIntraday();
        });
    }
}

module.exports = circleReq;
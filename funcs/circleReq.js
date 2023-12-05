const axios = require('axios');
const cron = require('node-cron');
const socketIO = require('./socketIO');

const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {
      function: 'TIME_SERIES_DAILY_ADJUSTED',
      symbol: 'MSFT',
      outputsize: 'compact',
      datatype: 'json'
    },
    headers: {
      'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
      'X-RapidAPI-Host': process.env.X_RapidAPI_Host
    }
};

const getTimeSeriesIntraday = async() => {
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
const circleReq = {
    init:()=>{
        // cron.schedule('* * * * *', () => {
            getTimeSeriesIntraday();
        // });
    }
}

module.exports = circleReq;
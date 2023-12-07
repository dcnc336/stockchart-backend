const axios = require('axios');
const cron = require('node-cron');
const socketIO = require('./socketIO');
const services = require('./../services')


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
        const period = `Time Series (${response.data['Meta Data']['4. Interval']})`;
        const period_id = await services.stockService.GetPeriodIdWithName(period);
        const lastdate = await services.stockService.GetLastDate(period_id);
        const data = response.data[period];
        const temp = Object.keys(data).map(key => {
            if ( !lastdate || (lastdate && key > lastdate) ) {
                return {
                    period_id : period_id,
                    date: key,
                    open : data[key]['1. open'],
                    high : data[key]['2. high'],
                    low : data[key]['3. low'],
                    close : data[key]['4. close'],
                    volume : data[key]['5. volume']
                }
            }
        }).filter(val => {
            if ( !val ) return false;
            return true;
        });
        if ( temp.length ) {
            if ( services.stockService.SaveStockSeries(temp) ){
                socketIO.getInstance().emit('submit_daily_data', JSON.stringify(temp));
            }
        }
    } catch (error) {
        console.error(error);
    }
}
const circleReq = {
    init:()=>{
        cron.schedule('*/15 * * * *', () => {
            var d = new Date();
            console.log(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
            getTimeSeriesIntraday(15);
        });
    }
}

module.exports = circleReq;
const axios = require('axios');
const cron = require('node-cron');
const socketIO = require('./socketIO');
const services = require('./../services');
var request = require('request');


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

/**************************************** Old function *********************************************************/
    // const options = {
    //   method: 'GET',
    //   url: 'https://alpha-vantage.p.rapidapi.com/query',
    //   params: {
    //     interval: `${val}min`,
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
    //     const response = await axios.request(options);
    //     const period = `Time Series (${response.data['Meta Data']['4. Interval']})`;
    //     const period_id = await services.stockService.GetPeriodIdWithName(period);
    //     const lastdate = await services.stockService.GetLastDate(period_id);
    //     const data = response.data[period];
    //     const temp = Object.keys(data).map(key => {
    //         if ( !lastdate || (lastdate && key > lastdate) ) {
    //             return {
    //                 period_id : period_id,
    //                 date: key,
    //                 open : data[key]['1. open'],
    //                 high : data[key]['2. high'],
    //                 low : data[key]['3. low'],
    //                 close : data[key]['4. close'],
    //                 volume : data[key]['5. volume']
    //             }
    //         }
    //     }).filter(val => {
    //         if ( !val ) return false;
    //         return true;
    //     });
    //     if ( temp.length ) {
    //         if ( services.stockService.SaveStockSeries(temp) ){
    //             socketIO.getInstance().emit('submit_daily_data', JSON.stringify(temp));
    //         }
    //     }
    // } catch (error) {
    //     console.error(error);
    // }
/****************************************End Old Function  *********************************************************/




/********************************************Fom mintime options **********************************************/

const getTimeSeriesIntraday = async(function_name, symbol_name , period='', month='') => {
    var url = '';
    switch(function_name) {
        case 'TIME_SERIES_INTRADAY':
            url = `${process.env.AlphaVantage_Api_Host}function=${function_name}&symbol=${symbol_name}&interval=${period}&month=${month}&outputsize=full&apikey=${process.env.AlphaVantage_Api_Key}`;
            break;
        case 'TIME_SERIES_DAILY':
            url = `${process.env.AlphaVantage_Api_Host}function=${function_name}&symbol=${symbol_name}&outputsize=full&apikey=${process.env.AlphaVantage_Api_Key}`;
            break;
        case 'TIME_SERIES_WEEKLY':
            url = `${process.env.AlphaVantage_Api_Host}function=${function_name}&symbol=${symbol_name}&outputsize=full&apikey=${process.env.AlphaVantage_Api_Key}`;
            break;
        case 'TIME_SERIES_MONTHLY':
            url = `${process.env.AlphaVantage_Api_Host}function=${function_name}&symbol=${symbol_name}&apikey=${process.env.AlphaVantage_Api_Key}`;
            break;
        default:
            break;
    }
    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
    }, async(err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            var period = '';
            switch(function_name) {
                case 'TIME_SERIES_INTRADAY':
                    period = `Time Series (${data['Meta Data']['4. Interval']})`;
                    break;
                case 'TIME_SERIES_DAILY':
                    period = 'Time Series (Daily)';
                    break;
                case 'TIME_SERIES_WEEKLY':
                    period = 'Weekly Time Series';
                    break;
                case 'TIME_SERIES_MONTHLY':
                    period = 'Monthly Time Series';
                    break;
                default:
                    break;
            }
            var symbol = data['Meta Data']['2. Symbol'];
            var symbol_id = await services.stockService.GetSymbolIDWithName(symbol);
            var last_date = data['Meta Data']['3. Last Refreshed'];
            var period_id = await services.stockService.GetPeriodIdWithName(symbol_id, period);
            var temp_last_date = await services.stockService.GetLastDate(period_id);
            var series = data[period];
            var temp = Object.keys(series).map(key => {
                if ( !temp_last_date || (temp_last_date && key > temp_last_date) ) {
                    return {
                        period_id : period_id,
                        date: key,
                        open : series[key]['1. open'],
                        high : series[key]['2. high'],
                        low : series[key]['3. low'],
                        close : series[key]['4. close'],
                        volume : series[key]['5. volume']
                    }
                }
            }).filter(val => {
                if ( !val ) return false;
                return true;
            });
            await services.stockService.UpdateLastDate(period_id, last_date);
            console.log(temp);
            if ( temp.length ) {
                if ( await services.stockService.SaveStockSeries(temp) ){
                    // socketIO.getInstance().emit('submit_daily_data', JSON.stringify(temp));
                }
            }
        }
    });
    
}

getHistoricData = async(function_name, symbol, period, month ) => {
    var url = `${process.env.AlphaVantage_Api_Host}function=${function_name}&symbol=${symbol}&interval=${period}&month=${month}&outputsize=full&apikey=${process.env.AlphaVantage_Api_Key}`;

    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
    }, async(err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            const period = `Time Series (${data['Meta Data']['4. Interval']})`;
            const period_id = await services.stockService.GetPeriodIdWithName(period);
            const series = data[period];
            const temp = await Object.keys(series).map((key) => {
                const obj = {
                    period_id : period_id,
                    date: key,
                    open : series[key]['1. open'],
                    high : series[key]['2. high'],
                    low : series[key]['3. low'],
                    close : series[key]['4. close'],
                    volume : series[key]['5. volume']
                }
                services.stockService.SaveSeriesIfNotExists(obj);
                console.log('end');
            });
        }
    });
}

// const monthArray = [
//     '2000-01','2000-02','2000-03','2000-04','2000-05','2000-06','2000-07','2000-08','2000-09','2000-10','2000-11','2000-12',
//     '2001-01','2001-02','2001-03','2001-04','2001-05','2001-06','2001-07','2001-08','2001-09','2001-10','2001-11','2001-12',
//     '2002-01','2002-02','2002-03','2002-04','2002-05','2002-06','2002-07','2002-08','2002-09','2002-10','2002-11','2002-12',
//     '2003-01','2003-02','2003-03','2003-04','2003-05','2003-06','2003-07','2003-08','2003-09','2003-10','2003-11','2003-12',
//     '2004-01','2004-02','2004-03','2004-04','2004-05','2004-06','2004-07','2004-08','2004-09','2004-10','2004-11','2004-12',
//     '2005-01','2005-02','2005-03','2005-04','2005-05','2005-06','2005-07','2005-08','2005-09','2005-10','2005-11','2005-12',
//     '2006-01','2006-02','2006-03','2006-04','2006-05','2006-06','2006-07','2006-08','2006-09','2006-10','2006-11','2006-12',
//     '2007-01','2007-02','2007-03','2007-04','2007-05','2007-06','2007-07','2007-08','2007-09','2007-10','2007-11','2007-12',
//     '2008-01','2008-02','2008-03','2008-04','2008-05','2008-06','2008-07','2008-08','2008-09','2008-10','2008-11','2008-12',
//     '2009-01','2009-02','2009-03','2009-04','2009-05','2009-06','2009-07','2009-08','2009-09','2009-10','2009-11','2009-12',
//     '2010-01','2010-02','2010-03','2010-04','2010-05','2010-06','2010-07','2010-08','2010-09','2010-10','2010-11','2010-12',
//     '2011-01','2011-02','2011-03','2011-04','2011-05','2011-06','2011-07','2011-08','2011-09','2011-10','2011-11','2011-12',
//     '2012-01','2012-02','2012-03','2012-04','2012-05','2012-06','2012-07','2012-08','2012-09','2012-10','2012-11','2012-12',
//     '2013-01','2013-02','2013-03','2013-04','2013-05','2013-06','2013-07','2013-08','2013-09','2013-10','2013-11','2013-12',
//     '2014-01','2014-02','2014-03','2014-04','2014-05','2014-06','2014-07','2014-08','2014-09','2014-10','2014-11','2014-12',
//     '2015-01','2015-02','2015-03','2015-04','2015-05','2015-06','2015-07','2015-08','2015-09','2015-10','2015-11','2015-12',
//     '2016-01','2016-02','2016-03','2016-04','2016-05','2016-06','2016-07','2016-08','2016-09','2016-10','2016-11','2016-12',
//     '2017-01','2017-02','2017-03','2017-04','2017-05','2017-06','2017-07','2017-08','2017-09','2017-10','2017-11','2017-12',
//     '2018-01','2018-02','2018-03','2018-04','2018-05','2018-06','2018-07','2018-08','2018-09','2018-10','2018-11','2018-12',
//     '2019-01','2019-02','2019-03','2019-04','2019-05','2019-06','2019-07','2019-08','2019-09','2019-10','2019-11','2019-12',
//     '2020-01','2020-02','2020-03','2020-04','2020-05','2020-06','2020-07','2020-08','2020-09','2020-10','2020-11','2020-12',
//     '2021-01','2021-02','2021-03','2021-04','2021-05','2021-06','2021-07','2021-08','2021-09','2021-10','2021-11','2021-12',
//     '2022-01','2022-02','2022-03','2022-04','2022-05','2022-06','2022-07','2022-08','2022-09','2022-10','2022-11','2022-12',
//     '2023-01','2023-02','2023-03','2023-04','2023-05','2023-06','2023-07','2023-08','2023-09','2023-10','2023-11','2023-12',
// ];

const circleReq = {
    init:()=>{
        cron.schedule('*/15 * * * *', () => {
            var d = new Date();
            console.log(`15min-${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
            getTimeSeriesIntraday("TIME_SERIES_INTRADAY", "MSFT", "15min", `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`);
        });
        cron.schedule('*/30 * * * *', () => {
            var d = new Date();
            console.log(`30min-${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
            getTimeSeriesIntraday("TIME_SERIES_INTRADAY", "MSFT", "15min", `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`);
        });
        cron.schedule('*/60 * * * *', () => {
            var d = new Date();
            console.log(`60min-${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
            getTimeSeriesIntraday("TIME_SERIES_INTRADAY", "MSFT", "60min", `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`);
        });
        cron.schedule('0 1 * * *', () => {
            var d = new Date();
            console.log(`daily-${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
            getTimeSeriesIntraday("TIME_SERIES_DAILY", "MSFT");
        });
        cron.schedule('0 0 * * 0', () => {
            var d = new Date();
            console.log(`daily-${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
            getTimeSeriesIntraday("TIME_SERIES_WEEKLY", "MSFT");
        });
        cron.schedule('0 0 1 * *', () => {
            getTimeSeriesIntraday("TIME_SERIES_MONTHLY", "MSFT");
        });
        // var i = 0;
        // const historic = setInterval(() => {
        //     console.log(i);
        //     console.log(monthArray[i])
        //     if ( i >= monthArray.length ) {
        //         clearInterval(historic);
        //         return;
        //     }
        //     if ( monthArray[i]){
        //         getHistoricData("TIME_SERIES_INTRADAY", "MSFT", "15min", monthArray[i]);
        //     }
        //     i += 1;
        // },30000);
    }
}

module.exports = circleReq;
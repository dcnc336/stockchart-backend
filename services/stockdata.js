const Model = require("./../models");
const stockdata = Model.Stockdata;
const stockperiod = Model.Stockperiod;

const GetPeriodIdWithName = async(name) => {
    const record = await stockperiod.find({period_name: name});
    if (!record.length){
        const newPeriodRow = new stockperiod({
            period_name: name
        });
        newPeriodRow.save();
        return newPeriodRow['_id'].toString();
    }
    return record[0]['_id'].toString();
}

const GetPeriodNameWithID = async(_id) => {
    return await stockperiod.findById(_id);
}

const GetPeriods = async() => {
    return await stockperiod.find({});
}

const GetSeries = async(period_id) => {
    return await stockdata.find({period_id:period_id}).sort({date:1});
}

const GetLastDate = async(period_id) => {
    const lastrow = await stockdata.find({period_id:period_id}).sort({date: -1}).limit(1);
    if ( !lastrow.length ){
        return null;
    }
    return lastrow[0].date;
}

const SaveStockSeries = async(datarows) => {
    const rows = await stockdata.insertMany(datarows);
    return true;
}

module.exports = {
    GetPeriodIdWithName,
    GetPeriodNameWithID,
    GetPeriods,
    GetSeries,
    GetLastDate,
    SaveStockSeries
}
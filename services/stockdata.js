const Model = require("./../models");
const stockdata = Model.Stockdata;
const periodname = Model.PeriodName;
const stockperiod = Model.Stockperiod;
const stocktype = Model.Stocktype;

const InsertPeriodName = async({name, label}) => {
    const periodone = periodname.find({name:name, label: label});
    if ( periodname.length > 0 ) return false;
    const newperiod = new periodname({name: name, label: label});
    newperiod.save();
    return newperiod;
}

const GetSymbolIDWithName = async(name) => {
    const record = await stocktype.find({name: name});
    if ( !record.length ){
        const newSymbolRow = new stocktype({
            name: name
        });
        newSymbolRow.save();
        return newSymbolRow['_id'].toString();
    }
    return record[0]['_id'].toString();
}

const GetSymbolWithID = async(_id) => {
    return await stocktype.findById(_id);
}

const GetSymbolsWithSearch = async(search) => {
    if ( search.trim().length == 0 ){
        return await stocktype.find({});
    }
    return await stocktype.find({name: {$regex:search, $options: 'i'}});
}

const GetPeriodIdWithName = async(symbol_id, period_name) => {
    const record = await stockperiod.find({symbol_id: symbol_id, period_name: period_name});
    if (!record.length){
        const newPeriodRow = new stockperiod({
            symbol_id: symbol_id,
            period_name: period_name
        });
        newPeriodRow.save();
        return newPeriodRow['_id'].toString();
    }
    return record[0]['_id'].toString();
}

const GetPeriodWithID = async(_id) => {
    return await stockperiod.findById(_id);
}

const GetStocktypes = async() => {
    return await stocktype.find({});
}

const GetPeriodIDWithSymbolID = async(symbol_id, period_name) => {
    const period = await stockperiod.find({symbol_id: symbol_id, period_name: period_name});
    if ( period.length > 0 ) {
        return period[0]['_id'].toString();
    }
    return null;
}

const GetSeries = async(period_id) => {
    const data = await stockdata.find({period_id:period_id}).sort({date:-1}).limit(10000);
    const ascendingData = data.sort((a, b) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
    return ascendingData;
}

const GetLastDate = async(period_id) => {
    const lastrow = await stockperiod.findById(period_id);
    if ( !lastrow ) return null;
    return lastrow.last_date?lastrow.last_date:null;
}

const UpdateLastDate = async(period_id, last_date) => {
    const lastrow = await stockperiod.findById(period_id);
    if ( !lastrow.last_date || lastrow.last_date < last_date ){
        const newrow = await stockperiod.findByIdAndUpdate(period_id, {last_date: last_date}, {new: true});
        return newrow.last_date;
    }
    return lastrow.last_date;
}

const SaveStockSeries = async(datarows) => {
    const rows = await stockdata.insertMany(datarows);
    return true;
}

module.exports = {
    InsertPeriodName,
    GetSymbolIDWithName,
    GetSymbolWithID,
    GetSymbolsWithSearch,
    GetPeriodIdWithName,
    GetPeriodWithID,
    GetStocktypes,
    GetPeriodIDWithSymbolID,
    GetSeries,
    GetLastDate,
    UpdateLastDate,
    SaveStockSeries,
}
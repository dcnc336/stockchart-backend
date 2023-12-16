// const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const express = require('express');
const router = express.Router();
const service = require('./../services');

router.get("/get_periods", async(req,response) => {
    try{
        const data = await service.stockService.GetStocktypes();
        return response.status(200).json(data);
    } catch(err){
        return response.status(400).json({
            statusCode: 400,
            message : "Server Error: please try again",
            error : "Bad Request"
        })
    } 
});

router.get("/get_periods/:search", async(req,response) => {
    const {search} = req.params ;
    try{
        const data = await service.stockService.GetSymbolsWithSearch(search);
        return response.status(200).json(data);
    } catch(err){
        return response.status(400).json({
            statusCode: 400,
            message : "Server Error: please try again",
            error : "Bad Request"
        })
    } 
});

router.post("/get_series", async(req,response) => {
    const {symbol_id, period_name} = req.body;
    try{
        const period_id = await service.stockService.GetPeriodIDWithSymbolID(symbol_id, period_name);
        if ( !period_id ){
            return response.status(200).json([]);
        }
        const data = await service.stockService.GetSeries(period_id);
        return response.status(200).json(data);
    } catch(err){
        return response.status(400).json({
            statusCode: 400,
            message : "Server Error: please try again",
            error : "Bad Request"
        })
    } 
});

module.exports = router;
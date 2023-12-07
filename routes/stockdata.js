// const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const express = require('express');
const router = express.Router();
const service = require('./../services');

router.get("/get_periods", async(req,response) => {
    try{
        const data = await service.stockService.GetPeriods();
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
    const {period_id, c_year} = req.body ;
    try{
        const data = await service.stockService.GetSeries(period_id, c_year);
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
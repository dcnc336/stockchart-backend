const express = require("express");
const router = express.Router();
const service = require('./../services');

router.get('/vulves/:vulveName',async(req,response) => {
    const param = {
        vulveName : req.params.vulveName
    }
    try{
        const result = await service.vulveService.getVulve(param);
        if(result.length > 0){
            response.json(result);
        } else {
            response.status(400).json({
                message: "Error: Server Error",
            })
        }
    } catch (error) {
        response.status(400).json({
            message: "Error: Server Error",
        })
    }
})

router.get('/vulves/:_id/:s_user_id',async(req,response) => {
    const param = {
        _id : req.params._id,
        s_user_id : req.params.s_user_id
    }
    if ( param['s_user_id'] == undefined ){
        response.status(400).json({
            message: "Error: Front socket error",
        })
    }
    try{
        const vulves = await service.vulveService.getVulves(param);
        response.json(vulves);
    } catch(error){
        response.status(400).json({
            message: "Error: Get vulves request Failed",
        });
    }
});

router.post('/vulves',async(req,response) => {
    const vulveDTO = req.body ;
    try{
        const result = await service.vulveService.saveVulve(vulveDTO);
        response.json(result);
    } catch(error){
        response.status(400).json({
            message: "Error: Vulve not created",
        })
    }
});

router.delete('/vulves/:vulveName',async(req,response) => {
    const vulveName = req.params.vulveName ;
    try{
        const result = await service.vulveService.deleteVulve(vulveName);
        if ( result != null ){
            response.json({result : true});
        } else {
            response.status(400).json({
                message:"Error: there are some problem at server side"
            })
        }
    } catch(error) {
        response.status(400).json({
            message:"Error: there are some problem at server side"
        })
    }
})

router.put('/vulves/:userId',async(req,response) => {
    // const userId = req.params.userId ;
    try{
        // const result = await service.vulveService.formatOpenVulve(userId);
        // for ( var i = 0 ; i < result.length ; i ++ ){
        //     if ( result[i].s_device_id == undefined ) continue ;
        //     socketIO.to(result[i].s_device_id).emit('value',0);
        // }
        response.json({message:"true"});
    } catch(error) {
        response.status(400).json({
            message:"Error: there are some problem at server side"
        })
    }
})

module.exports = router ;
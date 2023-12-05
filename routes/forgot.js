const express = require('express');
const router = express.Router();
const service = require('./../services');
const sendEmail = require('./../funcs/sesService');

const makePasscode = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

router.get("/forgetpassword/:email", async(req, response) => {
    const {email} = req.params;
    try{
        const existUser = await service.userService.existUser(email);
        if ( !existUser.state ){
            return response.status(502).json({
                message: "User not register"
            });
        } else {
            const passcode = makePasscode(6);
            const temp = await service.userService.savePasscode(email, passcode);
            const result = await sendEmail(email, passcode, existUser.data[0].username);
            if ( result.MessageId ) {
                return response.json({
                    message: "please input passcode emailed."
                });
            } else {
                return response.status(400).json({
                    statusCode: 400,
                    message : "what happend? please send once more."
                })
            }
        }
    } catch(err) {
        return response.status(400).json({
            statusCode: 400,
            message : "Error: User not exist."
        })
    }
});

router.post("/forgetpassword", async(req, response) => {
    const {email, passcode} = req.body;
    const newPasscode = makePasscode(6);
    try{
        const result = await service.userService.checkPasscode(email, passcode, newPasscode);
        if ( !result.state ){
            return response.status(502).json({
                message: result.message 
            });
        } else {
            return response.json({
                message: result.message
            });
        }
    } catch (err) {
        return response.status(400).json({
            statusCode: 400,
            message: "Passcode is not matched."
        })
    }
});

router.post('/resetpassword', async(req, response) => {
    const {email, password} = req.body;
    try{
        const result = await service.userService.savePassword(email, password);
        if ( !result.state ){
            return response.status(502).json({
                message: result.message 
            });
        } else {
            return response.json({
                message: result.message
            });
        }
    } catch ( err ) {
        return response.status(400).json({
            statusCode : 400,
            message: "Server Error, pleaset try again"
        });
    }
})

module.exports = router;
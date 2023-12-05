const Model = require("./../models");
const user = Model.User;

const loginUser = async(signinDTO) => {
    return await user.find(signinDTO);
}

const existUser = async(email) => {
    const logined = await user.find({email:email});
    if ( logined.length > 0 ){
        return {
            state : 1,
            data : logined
        };
    } else {
        return {
            state : 0,
            data : null
        };
    }
}

const createUser = async(signupDTO) => {
    const newUser = await new user(signupDTO);
    return newUser.save() ;
}

const savePasscode = async(email, passcode) => {
    return await user.findOneAndUpdate({email: email}, {passcode: passcode}, {new:true});
}

const checkPasscode = async(email, passcode, newPasscode) => {
    const temp = await user.find({email: email, passcode: passcode});
    if ( temp.length > 0 ) {
        const userone = await user.findOneAndUpdate(
            {email: email, passcode: passcode}, 
            {passcode: newPasscode}, 
            {new:true, rawResult:true}
        );
        if ( userone.value instanceof user ){
            return {
                state: 1,
                message: "Please set password."
            }
        } else {
            return {
                state: 0,
                message: "Passcode is incorrect."
            }
        }
    } else {
        return {
            state: 0,
            message: "Passcode is incorrect."
        }
    }
}

const savePassword = async(email, password) => {
    const userone = await user.findOneAndUpdate(
        {email: email}, 
        {password: password}, 
        {new: true, rawResult: true}
    );
    if ( userone.value instanceof user){
        return {
            state: 1,
            message: "Password set correctly"
        }
    } else {
        return {
            state: 0,
            message: "Invalid User, Please try again"
        }
    }
}

module.exports = {
    loginUser,
    existUser,
    createUser,
    savePasscode,
    checkPasscode,
    savePassword
}
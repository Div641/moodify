const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");

async function authUser(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }

    //doing this taaki koi agar galti se token kisi tarah se chori kar k apne browser ki cookie mai add krta to usse hamara data mil jata, vo cheez na ho ,usse bachane k liye hm blacklisted tokens ko check krte hai
    const isTokenBlacklisted = await blacklistModel.findOne({
        token
    })

    //actual blacklisting REDIS se hoti hai

    try{
        const decoded =jwt.verify(
        token,
        process.env.JWT_SECRET,
    )

    req.user= decoded

    next()
}catch(err ) {
    return res.status(401).json({
        message:"Invalid token",
        
        
    })
}



}

module.exports={authUser}
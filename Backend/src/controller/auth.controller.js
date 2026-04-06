const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache");


async function registerUser(req, res) {
    const {username, email, password} =req.body;
    console.log({email});
    const isAlreadyRegistered = await userModel.findOne({
        $or : [
            {email},
            {username}
        ]
    })

    if(isAlreadyRegistered){
        return res.status(400).json({
            message:"User with this email or username already exists"
        })
    }

    const hash = await bcrypt.hash(password,10);

    const user= await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },
    process.env.JWT_SECRET,{
        expiresIn:"3d"
    }
)

res.cookie("token", token)

return res.status(201).json({
    message:"User registered successfully ",
    user:{
        id: user._id,
        username:user.username,
        email:user.email
    }
})

}

async function loginUser(req,res){
    const{email,password,username}=req.body;

    const user= await userModel.findOne({
        $or: [
            {email },
            {username}
        ]
    }).select("+password")

    if(!user) {
        return res.status(400).json({
            message:"Invalid credentials" //If an API returns:"User not found", "Wrong password" ;so Hackers can guess which emails exist in your database.
        })
    }

    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const token = jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"3d"
        }
    )

    res.cookie("token",token)

    return res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

async function getMe(req,res){
    const user = await userModel.findById(req.user.id) //method1: -->  .select("-password")  //taaki data k sath password na dikhaye (for security resons) 
    //.select baar baar krna pdta har function mai,isiliye we provide input in schema
    res.status(200).json({
        message:"user fetched successfully",
        user
    })
}

async function logoutUser(req,res) {
    const token = req.cookies?.token

    if (!token) {
        return res.status(400).json({
            message: "No token found"
        });
    }

    res.clearCookie("token")

    // await blacklistModel.create({token})
    //now token is stored in redis instead of mongodb, because redis is faster than mongodb and we only need to store token for 3 days, so we can set an expiry time for the token in redis
    await redis.set(token, Date.now().toString(),"EX", 60*60*24*3) //3 din tak blacklisted rahega


    //redis stores data in key value pair
    //js mai object bhi key value pair use krta hai

    res.status(200).json({
        message:"logout successfull"
    })
}


module.exports ={registerUser , loginUser ,getMe, logoutUser}
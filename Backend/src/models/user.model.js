const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:[true, "Username is required"],
        unique: [true, "Username must be unique"]
    },
    email : {
        type:String ,
        required: [true,"Email is required"],
        unique:[true, "Email must be required"]
    },
    password:{
        type:String,
        required:[true , "Password is required"],
        select: false //taaki normally fetch na ho vrna password visiblity is a breach of security n jaha actually need hoti vaha add kar lenge alag se like user wale mai
    }
})

// userSchema.pre("save", function(next) {})
const usermodel = mongoose.model("users",userSchema);

module.exports = usermodel;
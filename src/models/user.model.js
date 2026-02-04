import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name : {
        type : String , 
        required : true
    },
    email : {
        type : String , 
        required : true,
        lowercase : true,
        unique : true
    },
    fullname : {
        type : String ,
    },
    password : {
        type : String ,
        required : true
    },
    refreshToken : {
        type :String
    } 

} , { timestamps : true })

UserSchema.pre("save" ,  async function (next) {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password , 10);
    
})

UserSchema.methods.passwordVerification = async function (password) {
    return await bcrypt.compare(password , this.password);
}

UserSchema.methods.accessTokenGeneration = function () {
    return jwt.sign({
        name : this.name , 
        _id : this._id,
        fullname : this.fullname
    }, 
    process.env.ACCESS_TOKEN_SECRET ,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY 
    })
}

UserSchema.methods.refreshTokenGeneration = function () {
    return jwt.sign({
        _id : this._id
    }, 
    process.env.REFRESH_TOKEN_SECRET ,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY 
    })
}

export const User = mongoose.model("User" , UserSchema);
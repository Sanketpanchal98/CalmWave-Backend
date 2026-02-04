import { response } from "express";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import errorHandler from '../utils/errorHandler.js';
import responseHandler from '../utils/responseHandler.js';

const accessAndRefreshTokenGenerator = async (userId) => {

    try {
        const user = await User.findById(userId);
        
        const refreshToken = user.refreshTokenGeneration();
        const accessToken = user.accessTokenGeneration()
        
        user.refreshToken = refreshToken
        
        await user.save({validateBeforeSave : false})
        
        return { accessToken , refreshToken }
    } catch (error) {
        throw new errorHandler(400 , "Error while generation of tokens", error)
    }

}

const userRegister = asyncHandler ( async (req , res ) => {

    const {fullname , name , password , email} =  req.body

    if(!name && !password && !email){
        throw new errorHandler(400 , "Need every field")
    }
    

    const alreadyExists = await User.findOne({email});
    if(alreadyExists){
        throw new errorHandler(409 , "Username already exists");
    }
    const user = await User.create({
        password,
        name,
        email,
    });

    const { accessToken , refreshToken } = await accessAndRefreshTokenGenerator(user._id);

    res.status(200)
    .header({'Authorization': `Bearer ${accessToken}`, 'x-refresh-token': refreshToken})
    .json(
        new responseHandler(200 , {accessToken , user ,refreshToken} ,"user registered successfully")
    ); 

})

const userLogin = asyncHandler ( async (req , res ) => {

    const{password , email } = req.body

    if(!password && !email){
        throw new errorHandler(401 , "Data is required while loggin in")
    }

    const user = await User.findOne({email});

    if( !user ){
        throw new errorHandler( 404, "User not found" );
    }

    const Loggedin = await user.passwordVerification(password);
    
    if(!Loggedin) throw new errorHandler(401 , "Password is incorrect");
    
    const { accessToken , refreshToken } = await accessAndRefreshTokenGenerator(user._id);

    res.status(200)
    .header({'Authorization': `Bearer ${accessToken}`, 'x-refresh-token': refreshToken})
    .json(
        new responseHandler(200 , {accessToken , user ,refreshToken} ,"user logged in successfully")
    );

});

const getUserProfile = asyncHandler( async ( req, res ) => {
    
    const user = await User.findById(req.user._id);

    if( !user ){
        throw new errorHandler( 404, "User not found" );
    }

    res.status(200)
    .json(
        new responseHandler( 200, "User fetched successfully", user )
    )

} )


export {
    userRegister,
    userLogin,
    getUserProfile
}
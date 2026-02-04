import asyncHandler from "../utils/asyncHandler.js";
import errorHandler from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken'


const AuthMiddleware = asyncHandler( async(req, res, next)  => {
    
    try {
        
        const accessTokenBearer = await req.headers?.authorization;
        // console.log(req.headers);
        
    
        const accessToken = accessTokenBearer.split(' ')[1];

        if(!accessToken){
            throw new errorHandler(401, 'access Token not found : auth-Mid')
        }
    
        const decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    
        req.user = decodedToken;
    
        next();
    } catch (error) {
        throw new errorHandler(401, `accessToken expired : ${error}`, error)
    }

})

export default AuthMiddleware;
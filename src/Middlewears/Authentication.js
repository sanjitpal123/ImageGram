// Middleware to check authentication

import { verifyJwt } from "../utils/jwt.js";
//import { doesUserExists } from "../services/UserService.js"; 
export const isAuthenticated=async(req,res,next)=>{
const token=req.headers["x-access-token"] 
if(!token)
{ 
    return res.status(400).json({
        success:false, 
        message:'Token is required'
    })
}
try{
    const response=verifyJwt(token);
    console.log('response',response)
    //const isexist=await doesUserExists(response.email)
    if(!isexist)
    {
        return res.status(404).json({
            success:false,
            message:'user is not found'
        })
        
    }
    req.user=response;
    next()

}catch(error)
{
    console.log(error)
    return res.status(401).json({
        success:false,
        message:'Invalid token'
    })
}
}

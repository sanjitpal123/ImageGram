import { SingupService } from "../services/UserService.js";
import { Signin } from "../services/UserService.js";
 export const SignUp=async(req,res)=>{
    try{
        const user=await SingupService(req.body)
        return res.status(201).json({
            success:true,
            message:'User is created successfully',
            data:user
        })
    }catch(error)
    {
        if(error.status){
            return res.status(error.status).json({
              success:false,
              message:error.message
            })
        }
        return res.status(501).json({
            success:false,
            message:'Internal server error'
        })
    }
 }

 export const signin = async (req, res) => {
    try {
        const response = await Signin(req.body);
        console.log('response', response);
        return res.status(201).json({
            success: true,
            message: 'User is signed in successfully',
            token: response,
        });
    } catch (error) {
        if (error.status) {  // Corrected spelling here
            return res.status(error.status).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(501).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

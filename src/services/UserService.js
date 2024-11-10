import {CreateUser, findUserByEmail} from "../Repository/UserRepo.js"
import bcrypt from 'bcrypt'
import { genereToken } from "../utils/jwt.js";
export const SingupService=async(user)=>{
    try{
        const Newuser=await CreateUser(user);
        return Newuser;
    }catch(error)
    {
        if(error.code===11000)
        {
            throw{
                status:401,
                success:false,
                message:'User is exists with the same email or username'
            }
        }
        throw error;
    }
}
export const Signin = async (userDetail) => {
    try {
        const user = await findUserByEmail(userDetail.email);
        console.log('user', user);
        if (!user) {
            throw {
                status: 404,
                message: 'user not found',
            };
        }
        const isValidPassword = bcrypt.compareSync(userDetail.password, user.password); // Corrected order here
        if (!isValidPassword) {
            throw {
                status: 401,
                message: 'invalid password',
            };
        }
        const token = genereToken({ email: user.email, _id: user._id, userName: user.userName });
        console.log('token', token);
        return token;
    } catch (error) {
        throw error;
    }
};

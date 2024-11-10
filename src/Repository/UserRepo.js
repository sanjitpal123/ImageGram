import UserSchema from '../schema/UserSchema.js'
export const CreateUser=async(user)=>{
    try{
        const newUser=new UserSchema(user);
        await newUser.save()
        return newUser;
    }catch(error)
    {
        throw error;
    }
}
export const findUserByEmail=async(email)=>{
    try{
      const user=await UserSchema.findOne({email})
      return user;
    }
    catch(error)
    {
        throw error;
    }

}
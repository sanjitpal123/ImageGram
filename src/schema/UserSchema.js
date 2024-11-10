import mongoose, { trusted } from "mongoose";
import bcrypt from 'bcrypt'
const userschema=mongoose.Schema({
    userName:{
        type:String,
        minLength:5,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minLength:5,
        required:true,
      
    },
    email:{
        type:String,
        minLength:5,
        unique:true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    }
})



userschema.pre('save',async function (next){
    try{
        const salt=await bcrypt.genSalt(9);
        this.password=await bcrypt.hashSync(this.password,salt);
        next()
    }catch(error)
    {
        throw error;
    }
})


const UserSchema=mongoose.model('UserSchema',userschema);
export default UserSchema;
const mongoose=require("mongoose")
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken")


const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your name"],
        minlength:[3,"Your Name Should be greater then 3 characters"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please Enter Your email"],
        minlength:[5,"Your Email Should be greater then 5 characters"],
        trim:true,
        unique:[true,"This Email is Already present"],
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password:{
        type:String,
        required:[true,"Please Enter Password"],
        minlength:[8,"Password should not be less then 8 characters"]
    }

})

UserSchema.pre("save",async function(){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

UserSchema.methods.comparePassword=async function(logPassword){
  const isMatch=  await bcrypt.compare(logPassword,this.password)
  return isMatch
}

UserSchema.methods.generateToken= function(){
   return jwt.sign({userId:this._id,userName:this.name},process.env.JWT_SECREAT,{expiresIn:"30d"})


}




const User=mongoose.model("User",UserSchema);
module.exports=User
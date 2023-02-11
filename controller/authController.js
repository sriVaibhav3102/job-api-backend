const { StatusCodes } = require("http-status-codes");
const User = require("../database/models/user");
const { BadRequest, CustomApiError, UnAuthorized, NotFound } = require("../error");

const register=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        throw new BadRequest("Please fill all the fields properly")
    }
    const user=await User.create(req.body)
    if(!user){
        throw new CustomApiError("User not created successfully")
    }
    res.status(StatusCodes.CREATED).json(user)

}
const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new BadRequest("Please fill all the fields properly")
    }
    const loguser=await User.findOne({email})
    if(!loguser){
        throw new NotFound("User not found")
    }
    const matchPassword=await loguser.comparePassword(password)

    if(!matchPassword){
        throw new UnAuthorized("Password do not match")
    }
    const token=loguser.generateToken()
    // console.log();
    res.status(StatusCodes.OK).json({token})
}


module.exports={register,login}
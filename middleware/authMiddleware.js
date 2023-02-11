const { UnAuthorized } = require("../error");
const jwt=require("jsonwebtoken")

const authenticate=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new UnAuthorized("You are not authorized.Please login first")
    }
    const token=authHeader.split(" ")[1]
    // console.log(token);
    try {
        const payload=jwt.verify(token,process.env.JWT_SECREAT);
        // console.log(payload);
        req.user={userId:payload.userId,userName:payload.userName}
    } catch (error) {
        throw new UnAuthorized("You are not authorize.Please login first")
    }

    next()

}


module.exports=authenticate



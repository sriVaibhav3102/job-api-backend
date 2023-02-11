const mongoose=require("mongoose")

const JobSchema=new mongoose.Schema({
    company:{
        type:String,
        required:[true,"Please enter company name"],
        maxlength:[50,"Company name should not be greate then 50 character"]
    },
    position:{
        type:String,
        required:[true,"Please enter company name"],
        maxlength:[50,"Company name should not be greate then 50 character"]
    },
    status:{
        type:String,
        enum:["pending","rejected","accepted"],
        default:"pending"
    },
   
    createdby:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"please provide user"]
    }
},{timestamps:true})

const Jobs=mongoose.model("Job",JobSchema)

module.exports=Jobs;
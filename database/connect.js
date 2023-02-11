const mongoose=require("mongoose")

mongoose.set('strictQuery', true)

const connectDb=async(url)=>{
  await mongoose.connect(url)
}


module.exports=connectDb
const { StatusCodes } = require("http-status-codes");
const Jobs = require("../database/models/job");
const {  BadRequest, NotFound } = require("../error");

const getAllJobs = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const jobs = await Jobs.find({ createdby: userId });
  if (!jobs) {
    throw new NotFound("Job not found");
  }
  return res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};

const createJob = async (req, res) => {
  const {
    user: { userId },
    body: { company, positon },
  } = req;

  req.body.createdby = userId;

  if (!company || !positon) {
    throw new BadRequest("Please fill all the fields properly");
  }

  const jobs = await Jobs.create(req.body);
  if (jobs) {
    res.status(StatusCodes.CREATED).send("Job created");
  }
};

const getJob = async (req, res) => {
  const {params:{id},user:{userId}}=req
  
  const singleJob=await Jobs.findOne({_id:id,createdby:userId})
  if( !singleJob){
    throw new NotFound("Job not found")
  }
  return res.status(StatusCodes.OK).json(singleJob)


};

const deleteJob = async (req, res) => {
  const {params:{id},user:{userId}}=req
  const singleJob=await Jobs.findOneAndDelete({_id:id,createdby:userId})
  if( !singleJob){
    throw new NotFound("Job not found")
  }

  return res.status(StatusCodes.OK).send("Deleted Job")
};
const updateJob = async (req, res) => {
  const {params:{id},user:{userId}}=req

  const singleJob=await Jobs.findOneAndUpdate({_id:id,createdby:userId},req.body,{new:true})
    if( !singleJob){
    throw new NotFound("Job not found")
  }
  return res.status(StatusCodes.OK).json(singleJob)

};

module.exports = { getAllJobs, createJob, getJob, deleteJob, updateJob };

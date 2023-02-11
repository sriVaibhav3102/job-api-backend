const express=require('express')
const { getAllJobs, createJob, getJob, deleteJob, updateJob } = require('../controller/jobsController')

const routerJob=express.Router()


routerJob.route("/jobs").get(getAllJobs).post(createJob)
routerJob.route("/jobs/:id").get(getJob).delete(deleteJob).patch(updateJob)

module.exports=routerJob
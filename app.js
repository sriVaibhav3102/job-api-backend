require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const router = require("./router/userRouter");
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const connectDb = require("./database/connect");
const routerJob = require("./router/jobRouter");
const authenticate = require("./middleware/authMiddleware");



// middleware
app.use(express.json())
app.use("/api/v1", router);
app.use("/api/v1",authenticate,routerJob)
app.use(notFound);
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 3000;

const start = () => {
  try {
    connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Listening on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start()

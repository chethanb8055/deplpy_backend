import mongoose from "mongoose";

// import validator from "validator";

export const dbConnection = () => {
  // console.log(process.env.MONGO_URI);
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "MERN_STACK_JOB_SEEKING" })
    .then(() => {
      console.log("Connected to databse");
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to db :${err}`);
    });
};

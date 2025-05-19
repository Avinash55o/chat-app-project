import mongoose from "mongoose";

const dbName= chatapp;

const connectDB= async()=>{
  try {
   const connectionInstance= await mongoose.connect(`${process.env.MONGO_URL}/${dbName}`)
    console.log(`database is connected !! db host is ${connectionInstance.connection.host}`)
  } catch (error) {
    console.error("error connecting to db", error)
    process.exit(1) // Terminate the process with a failure code
  }
}

export default connectDB;
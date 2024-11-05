import mongoose from "mongoose";

const dbConnect = async ()=>{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/taskmanagement`)
    console.log("Mongo db Connected to" , connectionInstance.connection.name)
}

export {dbConnect}
import { app } from "./app.js";
import dotenv from 'dotenv'
import { dbConnect } from "./db/index.js";

//handling uncaught exception
process.on("uncaughtException" , (err )=>{
    console.log("Error : ", err.message)
    console.log("Shutting down the server due to uncaught exception")
    process.exit(1)
})

dotenv.config({
    path: './.env'
})


dbConnect().then(()=>{
    app.on("error" , (error)=>{
        console.log("App not able to talk with DB" , error.message )
    })
    app.listen(process.env.PORT , ()=>{
        console.log("app listening")
    })
})
.catch((error)=>{
    console.log("DB connection failed")
    throw error
})
process.on("unhandledRejection" ,( err)=>{
    console.log(`Error : ${err.message}`)
    console.log(`Shutting down the server due to unhandled Promise rejection`);
    process.exit(1)
    
})
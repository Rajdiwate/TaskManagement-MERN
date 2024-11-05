import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error.middleware.js'
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';


export const app = express();

dotenv.config();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Setup express-session middleware
app.use(session({
    secret: 'fejfhufhfijfifjoefjofj', // Use a secure secret key for session encryption
    resave: false, // Do not save session if it hasn't been modified
    saveUninitialized: false, // Do not create a session until something is stored
    cookie : {
        maxAge : 1000 * 60 * 60 *60,
        httpOnly : true,
        secure : false
    }
}));

app.use(passport.authenticate("session"))
app.use(passport.initialize());
app.use(passport.session());

connectPassport()
app.use(express.json({ limit: '30mb', extended: true })) // works same as body parser
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cookieParser())


//Routing
import userRouter from './routes/user.route.js'
import { connectPassport } from './auth.js';
import taskRouter from './routes/task.route.js'


app.use('/api' , userRouter)
app.use('/api' , taskRouter)

//Middleware for error
app.use(errorMiddleware)
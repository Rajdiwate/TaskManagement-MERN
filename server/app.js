import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error.middleware.js'
import passport from 'passport'
import session from 'express-session'
import dotenv from 'dotenv'
import { connectPassport } from './auth.js'
import userRouter from './routes/user.route.js'
import taskRouter from './routes/task.route.js'

export const app = express()

// Load environment variables first
dotenv.config()

// 1. Configure CORS with specific options
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// 2. Parse cookies before session middleware
app.use(cookieParser())

// 3. Body parsing middleware
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

// 4. Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'fejfhufhfijfifjoefjofj',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        secure : true
    },
}))

// 5. Passport initialization (correct order is important)
app.use(passport.initialize())
app.use(passport.session()) // This should come after passport.initialize()


// 6. Connect passport configuration
connectPassport()

// 7. Routes
app.use('/api', userRouter)
app.use('/api', taskRouter)

// 8. Error handling middleware should be last
app.use(errorMiddleware)

// 9. Add a session check route for debugging
app.get('/api/check-auth', (req, res) => {
    res.json({
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        sessionID: req.sessionID,
        cookies: req.cookies
    })
})
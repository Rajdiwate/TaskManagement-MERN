import { Router } from "express";
import passport from "passport";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.coltroller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

//google authentication routes
router.get("/auth/google" , passport.authenticate('google', { scope: ['email', 'profile'] }) )
router.get('/auth/google/callback' , passport.authenticate('google' , {scope : ['email' , 'profile'] , successRedirect : "http://localhost:5173/"}) )

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(verifyJWT , logoutUser)
router.route('/user/me').get(verifyJWT , getCurrentUser)


export default router

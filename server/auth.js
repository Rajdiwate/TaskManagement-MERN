import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import {User} from './models/user.model.js'; // Adjust the path according to your project structure

export const connectPassport = ()=>{
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID ,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL// Ensure this matches your callback route
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Find or create user logic
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = await new User({ googleId: profile.id, email: profile.emails[0].value , name: profile.displayName }).save();
            }
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }));
    
    passport.serializeUser((user, done) => {
        done(null, user.id); // Serialize user id
    });
    
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id); // Retrieve user by id    
        done(null, user);
    });
    
}
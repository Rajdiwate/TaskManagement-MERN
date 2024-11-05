import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import {User} from './models/user.model.js'; // Adjust the path according to your project structure

export const connectPassport = ()=>{
    passport.use(new GoogleStrategy({
        clientID:"612009140650-oje31gm7ipkbs6jbnkt5hh8g4nsdiuf1.apps.googleusercontent.com" ,
        clientSecret:"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" ,
        callbackURL: "http://localhost:8000/api/auth/google/callback" // Ensure this matches your callback route
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
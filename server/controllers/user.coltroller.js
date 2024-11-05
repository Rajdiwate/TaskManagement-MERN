import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js";


const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const AT = await user.generateAccessToken();
        return { AT }
    } catch (error) {
        throw new ApiError("something went Wrong while generating tokens", 500)
    }
}

//Register a user
const registerUser = async (req, res, next) => {
    try {

        const { name, email, password } = req.body

        // Check if name, email, and password are provided
        if (!name || !email || !password) {
            return next(new ApiError("Incomplete Details", 400));
        }

        // Check if a user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ApiError("User with this email already exists", 400));
        }

        // Create a new user
        const user = await User.create({ name, email, password });

        // Select the user without password and refreshToken fields
        const createdUser = await User.findById(user._id).select("-password -refreshToken");
        if (!createdUser) {
            return next(new ApiError("Something went wrong while creating user", 500));
        }

        // Generate access and refresh tokens
        const { AT} = await generateTokens(createdUser._id);

        // Cookie options for accessToken and refreshToken
        const cookieOptions = {
            expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
            httpOnly: true,
            // secure: true  // Uncomment for secure HTTPS environments
        };

        // Return response with tokens in cookies and the created user
        return res.status(201).cookie("accessToken", AT, cookieOptions).json({ success: true, createdUser })

    } catch (error) {
        return next(new ApiError(error.message, 500));  // Handle the error with a 500 status
    }
};

//Login
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ApiError("Email and password is Required", 400))
        }

        const user = await User.findOne({ email: email })

        if (!user) return next(new ApiError("No user exists with the given email", 400))

        const isCorrectPassword = await user.isPasswordCorrect(password)
        if (!isCorrectPassword) {
            return next(new ApiError("Invalid Password", 400))

        }

        const { AT} = await generateTokens(user._id)
        const options = {
            maxAge: new Date(Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)),
            httpOnly: true,
            // secure: true
        }

        const userObject = user.toObject();
        delete userObject.password;

        return res.status(200).cookie("accessToken", AT, options).json({ success: true, user : userObject })

    } catch (error) {
        return next(new ApiError(error.message, 500))
    }
}


// Logout
const logoutUser = async (req, res, next) => {
    try {

        res.status(200)
            .clearCookie("accessToken")
            .clearCookie("connect.sid") // For clearing session cookies (e.g., from Google OAuth)
            .json({ success: true, message: "User logged out" });
    } catch (error) {
        return next(new ApiError(error.message, 400));
    }
};

const getCurrentUser = async(req,res,next)=>{
    try {
        const user =  await User.findById(req.user._id)
        return res.status(200).json({succes : true , user})
    } catch (error) {
        return next(new ApiError("Error while getting current user" , 500))
    }
}


export {registerUser ,loginUser,logoutUser,getCurrentUser}
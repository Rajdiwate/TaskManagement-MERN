import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";


// Schema definition
const userSchema = new Schema(
    {
        googleId : String,
        name: {
            type: String,
            required: [true, "Please Enter Your Name"],
            maxLength: [30, "Name cannot exceed 30 chars"],
            minLength: [2, "Name should have more than 2 characters"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Please Enter Your Email"],
            unique: true,
            validate: [validator.isEmail, "Please Enter a Valid Email"],
        },
        password: {
            type: String,
            // required: [true, "Enter Your Password"],
            minLength: [8, "Password should be greater than 8 characters"],
        },
      
        avatar: {
            public_id: {
                type: String,
                required: function () {
                    return this.avatar && this.avatar.public_id;
                },
            },
            url: {
                type: String,
                required: function () {
                    return this.avatar && this.avatar.url;
                },
            },
        },
        resetPasswordToken: String,
        resetPasswordExpiry: Date,
    },
    { timestamps: true }
);

//hash password before save
userSchema.pre("save", async function (next) { 
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Method to compare password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    return resetToken;
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};


// Export the User model
export const User = mongoose.model("User", userSchema);
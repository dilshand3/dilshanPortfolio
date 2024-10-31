import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
        },
        number: {
            type: Number,
        },
        lastLogin: {
            type: Date,
            default: Date.now
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        VerificationCode: {
            type: String
        },
        VerificationCodeExpiry: {
            type: Date
        },
        ResetPasswordToken: {
            type: String,
        },
        ResetPasswordTokenExpiry: {
            type: Date
        }
    }, {
    timestamps: true
})

export const User = mongoose.model("User", userSchema)
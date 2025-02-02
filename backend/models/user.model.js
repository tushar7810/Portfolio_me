import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true,"Name required"]
    },
    email: {
        type: String,
        required: [true,"Email required"],
        unique: true
    },
    phone: {
        type : String,
    },
    aboutMe: {
        type: String
    },
    password: {
        type: String,
        required: [true,"Password required"],
        minLength: [8, "Password must contain 8 character"],
        select: false
    },
    avatar : {
        public_id: {
            type: String,
            required: true
        },
        url : {
            type: String,
            required: true
        }
    },
    resume : {
        public_id: {
            type: String,
            required: true
        },
        url : {
            type: String,
            required: true
        }
    },
    portfolio: {
        type: String
    },
    githubURL: {
      type: String,
    },
    instagramURL: {
      type: String,
    },
    twitterURL: {
      type: String,
    },
    linkedInURL: {
      type: String,
    },
    facebookURL: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

// for hashing the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken
}

export const User = mongoose.model('User',userSchema)


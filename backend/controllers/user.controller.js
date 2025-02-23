import { v2 as cloudinary } from 'cloudinary'
import { catchAsyncErrors } from '../middleware/catchAsyncError.js'
import { User } from '../models/user.model.js'
import ErrorHandler from '../middleware/error.js'
import { sendCookieToken } from '../utils/jwtToken.js'
import { sendEmail } from '../utils/sendMail.js'
import {getResetPasswordToken} from '../utils/resetToken.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export const register = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Avatar required", 400))
    }

    const { avatar, resume } = req.files

    const cloudinaryResForAvatar = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {
            folder: "PORTFOLIO AVATAR"
        }
    )

    if (!cloudinaryResForAvatar || cloudinaryResForAvatar.error) {
        console.error("Cloudinary Error : ", cloudinaryResForAvatar.error || "Unknown cloudinary error")
    }

    const cloudinaryResForResume = await cloudinary.uploader.upload(
        resume.tempFilePath,
        {
            folder: "PORTFOLIO RESUME"
        }
    )

    if (!cloudinaryResForResume || cloudinaryResForResume.error) {
        console.error("Cloudinary Error : ", cloudinaryResForResume.error || "Unknown cloudinary error")
        return next(new ErrorHandler("Failed to upload resume", 500))
    }

    const {
        fullname, email, phone, aboutMe, password, portfolioURL, githubURL
    } = req.body

    if(!fullname){
        return next(new ErrorHandler("Fullname required!", 400))
    }else if(!email){
        return next(new ErrorHandler("email required!",400))
    }else if(!password){
        return next(new ErrorHandler("password required!",400))
    }

    const user = await User.create({
        fullname,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        avatar: {
            public_id: cloudinaryResForAvatar.public_id,
            url: cloudinaryResForAvatar.secure_url
        },
        resume: {
            public_id: cloudinaryResForResume.public_id,
            url: cloudinaryResForResume.secure_url
        }
    })

    sendCookieToken(user, "User registered successfully", 200, res)
})

export const login = catchAsyncErrors(async(req , res, next) => {
    try {
        const { email , password } = req.body

        if (!email || !password) return next(new ErrorHandler("Provide Email and Password", 400))

        const user = await User.findOne({ email }).select("+password")

        if (!user) return next(new ErrorHandler("User not found", 404))

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) return next(new ErrorHandler("Invalid password", 400))

        sendCookieToken(user, "User logged in successfully", 200, res)
    } catch (error) {
        console.log("Error occured in login control", error);
    }
})

export const logout = catchAsyncErrors(async (req, res, next) => {
    return res.status(200).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User logged out successfully"
    })
})

export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})

export const updateProfle = catchAsyncErrors(async (req, res, next) => {
    try {
        const userId = req.user._id;

        const { fullname, email, phone, aboutMe, githubURL, instagramURL, portfolio, facebookURL, twitterURL, linkedInURL } = req.body

        const user = await User.findById(userId).select("+password");

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phone) user.phone = phone;
        if(aboutMe) user.aboutMe = aboutMe;
        if(githubURL) user.githubURL = githubURL;
        if(instagramURL) user.instagramURL = instagramURL;
        if(portfolio) user.portfolio = portfolio;
        if(twitterURL) user.twitterURL = twitterURL;
        if(facebookURL) user.facebookURL = facebookURL;
        if(linkedInURL) user.linkedInURL = linkedInURL;

        if (req.files && req.files.avatar) {
            const avatar = req.files.avatar;
            // const user = await User.findById(req.user.id)

            const profileImageId = user.avatar.public_id
            await cloudinary.uploader.destroy(profileImageId)
            const newProfileImage = await cloudinary.uploader.upload(
                avatar.tempFilePath,
                {
                    folder: "PORTFOLIO AVATAR"
                }
            );
            user.avatar = {
                public_id: newProfileImage.public_id,
                url: newProfileImage.secure_url
            }
        }
        if (req.files && req.files.resume) {
            const resume = req.files.resume;
            // const user = await User.findById(req.user.id)

            const resumeFileId = user.resume.public_id
            if (resumeFileId) {
                await cloudinary.uploader.destroy(resumeFileId)
            }
            const newResume = await cloudinary.uploader.upload(
                resume.tempFilePath,
                {
                    folder: "PORTFOLIO RESUME"
                }
            );
            user.resume = {
                public_id: newResume.public_id,
                url: newResume.secure_url
            }
        }

        await user.save()

        res.status(200).json({
            success: true,
            message: "Profile Updated",
            user
        })

    } catch (error) {
        console.error('Error in update profile control' , error);
    }

})

export const updatePassword = catchAsyncErrors(async(req, res, next) => {
    try {
        
        const { currentPassword, newPassword, conformNewPassword } = req.body
        
        const userId =req.user._id;
        const user = await User.findById(userId).select("+password")

        if(!user){
            return next(new ErrorHandler("User not found",404))
        }

        // console.log(user);
        
        if (!currentPassword || !newPassword || !conformNewPassword) {
            return next(new ErrorHandler("Please give all details", 400))
        }

        const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Incorrect Current password", 400))
        }

        if (newPassword !== conformNewPassword) {
            return next(new ErrorHandler("New password and conform password not matched!", 400))
        }

        user.password = newPassword;

        await user.save();
        
        return res.status(200).json({
            success: true,
            message: "Password Updated successfully",
            password: newPassword,
            user
        })
    } catch (error) {
        console.error("Error occured in updatePassWord control : ", error)
    }
})

export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
    const id = `${process.env.PORTFOLIO_ID}`
    const user = await User.findById(id);
    res.status(200).json({
        success: true,
        user
    })
})

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) return next(new ErrorHandler("User not found", 404))

    const resetToken = getResetPasswordToken(user);
    await user.save({
        validateBeforeSave: false
    })
    const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`
    const message = `Your reset Password Token is :- \n\n ${resetPasswordUrl} \n\n If You've not requested this email then please ignore it`

    try {
        const sendMail = sendEmail({
            email: user.email,
            subject: `Personal Portfolio Dashboard Password Recovery`,
            message
        })
        
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
            sendMail: sendMail
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})

export const resetPassword = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.params

    const resetPasswordToken = crypto.createHash('sha256').update(token).digest("hex")

    let user = User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt : Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("Reset token is invalid or expires", 400))
    }
    if(req.body.password !==  req.body.conformNewPassword){
        return next(new ErrorHandler("password and conform password don't match", 400))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save();

    sendCookieToken(user,"Reset Password Successfully",200,res)
})
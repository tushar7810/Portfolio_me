import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import { SoftwareApplication } from '../models/softwareApplication.model.js'
import ErrorHandler from "../middleware/error.js";
import {v2 as cloudinary} from 'cloudinary'

export const addSoftware = catchAsyncErrors(async(req , res , next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Software Application Image required", 400))
    }
    const {image} = req.files;
    const {name} = req.body;
    if(!name) return next(new ErrorHandler("Software name required" , 400))

    const cloudinaryResponse = await cloudinary.uploader.upload(
        image.tempFilePath,
        {folder: "PORTFOLIO_SOFTWARE_IMAGE"}
    )

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(
            "Cloudinary error : ",
            cloudinaryResponse.error || "Unknown cloudinary error"
        )
    }

    const softwareApplication = await SoftwareApplication.create({
        name,
        image: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
       }
    )

    return res.status(200).json({
        success: true,
        message: "Software added successfully",
        softwareApplication
    })

})

export const deleteSoftware = catchAsyncErrors(async(req , res , next) => {
    const {id} = req.params

    const post = await SoftwareApplication.findById(id)
    if(!post){
        return next(new ErrorHandler("Software not found", 404))
    }
    await post.deleteOne()

    return res.status(200).json({
        success: true,
        message: "Software deleted successfully",
        post
    })
})
export const getAllSoftware = catchAsyncErrors(async(req , res , next) => {
    const softwares = await SoftwareApplication.find()
    return res.status(200).json({
        success: true,
        message: "All softwares fetched",
        softwares
    })
})
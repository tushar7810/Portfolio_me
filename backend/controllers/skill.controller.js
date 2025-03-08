import { Skill } from '../models/skill.model.js'
import ErrorHandler from '../middleware/error.js'
import { catchAsyncErrors } from '../middleware/catchAsyncError.js'
import cloudinary from 'cloudinary'

export const addSkill = catchAsyncErrors(async(req,res,next) => {
    if(!req.files || Object.keys(req.files).length === 0 ){
        return next(new ErrorHandler("Image required!" , 400))
    }

    const {image} = req.files

    const {title , proficiency } = req.body

    if(!title){
        return next(new ErrorHandler("Please enter title",400))
    }else if(!proficiency){
        return next(new ErrorHandler("Please enter proficiency",400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        image.tempFilePath,
        {
            folder: "PORTFOLIO-SKILL"
        }
    )

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Error in uploading image " , error)
    }

    const skill = await Skill.create({
        title,
        proficiency,
        image: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })

    return res.status(200).json({
        success: true,
        message: "Skill added successfully",
        skill
    })
})

export const deleteSkill = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params

    const skill = await Skill.findById(id)

    if(!skill) {
        return next(new ErrorHandler("Skill not found",404))
    }

    await Skill.deleteOne()

    return res.status(200).json({
        success: true,
        message: "Skill deleted successfully",
        skill
    })
})

export const updateSkill = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params
    let skill = await Skill.findById(id)

    if(!skill) {
        return next(new ErrorHandler("Skill not found",404))
    }
    
    const {proficiency} = req.body

    skill = await Skill.findByIdAndUpdate(
        id,
        {proficiency},
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    )

    res.status(200).json({
        success: true,
        message: "Skill Updated!",
        skill
    });
})

export const getAllSkill = catchAsyncErrors(async(req,res,next) => {
    const skills = await Skill.find()
    return res.status(200).json({
        success: true,
        message: "Skills get succesfully",
        skills 
    })
}) 
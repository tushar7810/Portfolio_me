import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import {Timeline} from '../models/timeline.model.js'
import ErrorHandler from "../middleware/error.js";

export const postTimeLine = catchAsyncErrors(async(req,res,next) => {
    const {title, description , from , to} = req.body

    if(!title || !description || !from || !to){
        return next(new ErrorHandler("Please fill full form", 400))
    }

    const newTimeline = await Timeline.create({
        title,
        description,
        timeline: {
            from,
            to
        }
    })
    return res.status(200).json({
        success: true,
        message: "Timeline added successfully",
        newTimeline
    })
})

export const deleteTimeline = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params 
    const timeline = await Timeline.findById(id)

    if(!timeline) return next(new ErrorHandler("Timeline not found",404))

    await timeline.deleteOne()    

    res.status(200).json({
        sucess: true,
        message: "Timeline deleted successfully",
        timeline
    })
})

export const getAllTimelines = catchAsyncErrors(async(req,res,next) => {
    const timelines = await Timeline.find()
    res.status(200).json({
        sucess: true,
        message: "All timeline are fetched",
        timelines
    })
})
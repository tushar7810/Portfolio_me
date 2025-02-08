import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Message } from "../models/message.model.js";

export const sendMessage = catchAsyncErrors(async(req,res,next) => {
    try {
        const {senderName , subject , message} = req.body
        if(!senderName || !subject || !message){
            return next(new ErrorHandler("Please fill full form", 400))
        }
        const data = await Message.create({
            senderName,
            subject,
            message
        })

        return res.status(200).json({
            success: true,
            message: "Message sent",
            data
        })
    } catch (error) {
        
    }
})

export const getAllMessage = catchAsyncErrors(async(req,res,next) => {
    const messages = await Message.find();
    return res.status(200).json({
        success: true,
        messages
    })
})

export const deleteMessage = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params
    const message = await Message.findById(id)
    if(!message) return next(new ErrorHandler("Message not found", 404))
    await message.deleteOne()

    res.status(200).json({
        success: true,
        message: "Message deleted",
        message
    })
})
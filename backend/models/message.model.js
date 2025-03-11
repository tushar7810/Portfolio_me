import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderName: {
      type: String,
      minLength: [2, "Name Must Contain At Least 2 Characters!"],
    },
    email:{
      type: String,
    },
    subject: {
      type: String,
      minLength: [4, "Subject Must Contain At Least 4 Characters!"],
    },
    message: {
      type: String,
      minLength: [10, "Message Must Contain At Least 10 Characters!"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
})

export const Message = mongoose.model('Message',messageSchema)
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dbConnect } from './database/dbConnection.js'
import { errorMiddleware } from './middleware/error.js'
import fileUpload from 'express-fileupload'
import messageRouter from './routes/messageRoutes.js'
import userRouter from './routes/userRoutes.js'
import timelineRouter from './routes/timeline.routes.js'
import softwareRouter from './routes/software.routes.js'
import projectRouter from './routes/project.routes.js'
import skillRouter from './routes/skill.routes.js'

const app = express()
dotenv.config({
    path: ".env"
})
app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials : true
}))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.use('/api/v1/message', messageRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/timeline' , timelineRouter)
app.use('/api/v1/software' , softwareRouter)
app.use('/api/v1/project' , projectRouter)
app.use('/api/v1/skill' , skillRouter)

dbConnect()
app.use(errorMiddleware)


export default app
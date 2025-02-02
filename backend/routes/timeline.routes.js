import express from 'express'
import { postTimeLine , deleteTimeline, getAllTimelines } from '../controllers/timeline.controller.js'
import {isAuthenticated} from '../middleware/auth.js'

const router = express.Router()

router.post('/add', isAuthenticated , postTimeLine)
router.delete('/delete/:id' , isAuthenticated , deleteTimeline)
router.get('/getall' , getAllTimelines)

export default router
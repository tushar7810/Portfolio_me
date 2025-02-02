import express from 'express'
import {sendMessage , getAllMessage , deleteMessage} from '../controllers/messege.controller.js'
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/send', sendMessage )
router.get('/getall', isAuthenticated ,getAllMessage)
router.delete('/delete/:id', isAuthenticated ,deleteMessage)


export default router
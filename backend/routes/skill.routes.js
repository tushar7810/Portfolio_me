import express from 'express'
import { addSkill , deleteSkill , getAllSkill } from '../controllers/skill.controller.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.post('/add' , isAuthenticated , addSkill)
router.delete('/delete/:id' , isAuthenticated , deleteSkill)
router.get('/all' , getAllSkill)

export default router
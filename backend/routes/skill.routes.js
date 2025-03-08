import express from 'express'
import { addSkill , deleteSkill , getAllSkill, updateSkill } from '../controllers/skill.controller.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.post('/add' , isAuthenticated , addSkill)
router.delete('/delete/:id' , isAuthenticated , deleteSkill)
router.put('/update/:id' , isAuthenticated , updateSkill)
router.get('/all' , getAllSkill)

export default router
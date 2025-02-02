import express from 'express'
import { addSoftware , deleteSoftware , getAllSoftware } from '../controllers/software.controller.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.post('/add' , isAuthenticated ,addSoftware)
router.delete('/delete/:id' , isAuthenticated , deleteSoftware)
router.get('/all' , getAllSoftware)

export default router
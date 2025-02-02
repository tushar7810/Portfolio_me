import express from 'express'
import {addProject , deleteProject , getAllProject, getSingleProject, updateProject } from '../controllers/project.controller.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.post('/post' , isAuthenticated ,addProject)
router.delete('/delete/:id', isAuthenticated , deleteProject )
router.get('/allProject', getAllProject )
router.put('/update/:id' , isAuthenticated , updateProject )
router.get('/getOne/:id' , getSingleProject)

export default router
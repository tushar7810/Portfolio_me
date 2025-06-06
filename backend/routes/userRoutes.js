import express from 'express'
import { isAuthenticated } from '../middleware/auth.js'
import { register, login , logout , getUser , updateProfle , updatePassword , getUserForPortfolio, forgotPassword, resetPassword, getResume } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/register' , register)
router.post('/login', login)
router.get('/logout' ,isAuthenticated, logout)
router.get('/getUser' ,isAuthenticated, getUser)
router.put('/update/profile' ,isAuthenticated, updateProfle)
router.put('/update/password' ,isAuthenticated, updatePassword)
router.get('/me/portfolio' , getUserForPortfolio)
router.post('/password/forgot' , forgotPassword)
router.put('/password/reset/:token' , resetPassword)
router.get('/resume',getResume)


export default router
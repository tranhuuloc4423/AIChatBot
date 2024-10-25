import express from 'express'
import {
  registerUser,
  loginUser,
  getById,
  getAll
} from '../controllers/authControllers.js'

const router = express.Router()

router.get('/user', getById)
router.get('/', getAll)
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router

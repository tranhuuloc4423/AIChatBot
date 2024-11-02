import express from 'express'
import {
  registerUser,
  loginUser,
  getById,
  ChangLang,
  getAll
} from '../controllers/authControllers.js'

const router = express.Router()

router.get('/user', getById)
router.get('/', getAll)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/language', ChangLang)

export default router

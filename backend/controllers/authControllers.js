import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const registerUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ msg: 'Email đã được sử dụng' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      email,
      password: hashedPassword
    })

    await newUser.save()
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    })

    res.status(201).json({ msg: 'Đăng ký thành công', token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ msg: 'Email hoặc mật khẩu không đúng' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Email hoặc mật khẩu không đúng' })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    })

    res.json({ msg: 'Đăng nhập thành công', user, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const getById = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ msg: 'Không tìm thấy người dùng' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ msg: 'Không có token, từ chối truy cập' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Token không hợp lệ' })
  }
}

import User from '../models/user.js'
import jwt from 'jsonwebtoken'

// Register route
export const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    return res.status(201).json({ message: `Welcome ${user.username}`})
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
}

// Login route
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const userLogin = await User.findOne({ email: email })

    if(!userLogin) throw new Error('User not found')

    if(!userLogin.validatePassword(password)){
      throw new Error('Password invalid')
    }
    
    const token = jwt.sign({ sub: userLogin._id }, process.env.SECRET, { expiresIn: '5d'})
    return res.json({ message: `Welcome back, ${userLogin.username}!`, token: token })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Unauthorized'})
  }
}
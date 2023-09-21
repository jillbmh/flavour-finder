import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const secureRoute = async function (req, res, next) {
  try {
    if (!req.headers.authorization) throw new Error('Missing authorization header')

    const token = req.headers.authorization.replace('Bearer ', '')

    const { sub: userId } = jwt.verify(token, process.env.SECRET)

    const user = await User.findById(userId)

    if (!user) throw new Error('⛔️ User that created the token no longer exists')

    req.user = user

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Unauthorized' })
  }
}

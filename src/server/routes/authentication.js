import express from 'express';
import { signUp } from '../../models/db/signup';
import { login } from '../../models/db/login';

const router = express.Router()

router.get('/signup', (req, res) => {
  res.render('users/signup')
})

router.post('/signup', (req, res, next) => {
  signUp(req.body)
  .then((user) => {
    if (user)
      return res.redirect('/')
  })
  .catch(next)
})

router.get('/login', (req, res) => {
  res.render('users/login')
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  login(email, password)
  .then((user) => {
    return res.redirect('/')
  })
  .catch(next)
})

export default router

import express from 'express';
import moment from 'moment';
import { signUp } from '../../models/db/signup';
import { login } from '../../models/db/login';

const router = express.Router()
router.use(middleware.setDefaultResponseLocals);

router.get('/signup', (req, res) => {
  res.render('users/signup', {crystal: false})
});

router.post('/signup', (req, res, next) => {
  signUp(req.body)
  .then((user) => {
    if (user)
      return res.redirect('/')
  })
  .catch(next)
});

router.get('/login', (req, res) => {
  res.render('users/login', {
    crystal: false,
    error: false,
  });
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  login(email, password)
  .then((user) => {
    if (!user) {
      const error = "Invalid username or password";
      res.render("users/login", {
        error: error,
        crystal: false
      });
    } else {
      req.session.user = userId;
      res.redirect(`/profile/public/${userId}`);
    }
  })
  .catch(next)
});

router.use(middleware.isLoggedIn);

export default router

import express from 'express'
import authentication from './authentication'
import crystals from './crystals'
import journals from './journals'
import users from './users'
import { findByCrystal } from '../../models/db/crystals';

const routes = express.Router()

routes.get('/', (req, res) => {
  const { user } = req.session;
  findByCrystal()
  .then(crystal => {
    res.render("journals/index", {user, crystal, crystal: false});
  })
  .catch(error => next(error));
});

routes.use('/', authentication)
routes.use('/crystals', crystals)
routes.use('/journals', journals)
routes.use('/users', users)

export default routes

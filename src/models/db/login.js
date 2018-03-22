import bcrypt from 'bcrypt';
import db from '../db';

const findByEmail = (email) => {
  const sql = `
    SELECT *
    FROM
      users
    WHERE email = $1
    `
  return db.one(sql, [email])
  .catch((error) => {
    console.error({
      message: 'Error occurred while executing users.findByEmail',
      arguments: arguments});
  });
};

const login = (email, password) => {
  return findByEmail(email)
  .then((validEmail) => {
    return bcrypt.compare(password, validEmail.encrypted_password)
    .then((validUser) => {
      if (!validUser) {
        throw new Error('Invalid username/password')
      }
      return validUser.id
    });
  });
};

module.exports = {
  findByEmail,
  login
};

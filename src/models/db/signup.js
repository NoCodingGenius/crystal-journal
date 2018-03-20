import bcrypt from 'bcrypt';
import db from '../db';

const encryptPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const create = (user) => {
  const sql = `
    INSERT INTO
      users (full_name, email, encrypted_password, favorite_crystal)
    VALUES ($1::text, $2::text, $3::text)
    `
  return db.query(sql, [user.full_name, user.email, user.encrypted_password, user.favorite_crystal]).catch(error => {
    console.error({
      message: 'Error occurred while executing users.create',
      arguments: arguments});
  });
};

const signUp = (user) => {
  return encryptPassword(user.password).then((hash) => {
    user.encrypted_password = hash
    return create(user);
  }).catch(error => {
    console.error({
      message: 'Error occurred while executing users.signUp',
      arguments: arguments});
  });
};

module.exports = {
  signUp
};

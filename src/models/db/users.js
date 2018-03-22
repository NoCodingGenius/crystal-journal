import db from './db';

const findByEmail = email => {
  const sql = `SELECT * FROM users WHERE email =$1`
  return db.oneOrNone(sql, [email])
  .catch(error => {
    console.error({
      message: 'Error occurred while executing users.findByEmail',
      arguments: arguments})
  });
};

const findById = id => {
  const sql = `SELECT * FROM users WHERE id = $1`
  return db.oneOrNone(sql, [id])
  .catch(error => {
    console.error({
      message: 'Error occurred while executing users.findById',
      arguments: arguments})
  });
};

const updateProfileById = (full_name, favorite_crystal, id) => db.oneOrNone(`
    UPDATE
      users
    SET
      full_name = $1,
      favorite_crystal = $2
    WHERE
      id = $3
    `, [full_name, favorite_crystal, id])

module.exports = {
  findByEmail,
  findById,
  updateProfileById
};

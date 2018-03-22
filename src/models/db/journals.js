import db from './db';

const findByUserId = id => {
  const sql = `SELECT * FROM journals WHERE user_id =$1`
  return db.any(sql, [id])
  .catch(error => {
    console.error({
      message: "Error occurred while executing journals.findByUserId",
      arguments: arguments});
  });
};

const findById = id => {
  const sql = `SELECT * FROM journals WHERE id = $1`
  return db.oneOrNone(sql, [id])
  .catch(error => {
    console.error({
      message: "Error occurred while executing journals.findById",
      arguments: arguments});
  });
};

const findByCrystal = id => {
  const sql = `
      SELECT * FROM
        crystals_posts
      JOIN posts ON journals.id = journal_id
      WHERE crystal_id = $1
      ORDER BY
        journal_id DESC
    `
  return db.any(sql, [id])
  .catch(error => {
    console.error({
      message: "Error occurred while executing journals.findByCrystal",
      arguments: arguments});
  });
};

const create = journal => {
  const sql = `
    INSERT INTO
      journals (user_id, title, body)
    VALUES
      ($1::int, $2::text, $3::text)
    RETURNING
      journals.id
  `
  return db.query(sql, [journal.user_id, journal.title, journal.body, journal.id])
  .catch(error => {
    console.error({
      message: 'Error occurred while executing journals.create',
      arguments: arguments});
  });
};

const updateCrystalsJournalsPost = (crystal, journal) => {
  const sql = `
    INSERT INTO
      crystals_journals (crystal_id, journal_id)
    VALUES
      ($1::int, $2::int)
    RETURNING
      journal_id
  `
  return db.query(sql, [crystal, journal])
  .catch(error => {
    console.error({
      message: 'Error occurred while executing journals.updateCrystalsJournal',
      arguments: arguments});
  });
};

const updateJournalById = (title, body, id) => db.oneOrNone(`
    UPDATE
      journals
    SET
      title = $1,
      body = $2
    WHERE
      id = $3
    RETURNING
      id
    `, [title, body, id])

const destroy = id => {
  const sql = `
    DELETE FROM
      journals
    WHERE
      journals.id = $1
  `
  return db.none(sql, [id])
  .catch(error => {
    console.error({
      message: 'Error occurred while executing journals.destroy',
      arguments: arguments});
  });
};

const destroyCrystalsJournals = id => {
  const sql = `
    DELETE FROM
      crystals_journals
    WHERE
      crystals_journals.journal_id = $1::int
  `
  return db.none(sql, id)
  .catch(error => {
    console.error({
      message: 'Error occurred while executing journals.destroyCrystalsJournals',
      arguments: arguments});
  });
};

module.exports = {
  findByUserId,
  findById,
  findByCrystal,
  create,
  updateCrystalsJournal,
  updateJournalById,
  destroy,
  destroyCrystalsJournals
};

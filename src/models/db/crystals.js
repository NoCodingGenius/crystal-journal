const db = require("./db");

const findByCrystal = () => {
  const sql = `SELECT * FROM crystals`;
  return db.query(sql, [])
  .catch(error => {
    console.error({
      message: "Error occurred while executing posts.findByCrystal",
      arguments: arguments});
  });
};

const findById = id => {
  const sql = `SELECT * FROM crystals WHERE id = $1`
  return db.oneOrNone(sql, [id])
  .catch(error => {
    console.error({
      message: "Error occurred while executing posts.findById",
      arguments: arguments});
  });
};

const findByJournalId = id => {
  const sql = `SELECT * FROM crystals_journals WHERE journal_id = $1`
  return db.oneOrNone(sql, [id])
  .catch(error => {
    console.error({
      message: "Error occurred while executing posts.findByJournalId",
      arguments: arguments});
  });
};

const findByIdForCrystalsJournals = id => {
  const sql = `SELECT * FROM crystals WHERE id = $1`
  return db.oneOrNone(sql, [id])
  .catch(error => {
    console.error({
      message: "Error occurred while executing posts.findByIdForCrystalsJournals",
      arguments: arguments});
  });
};

module.exports = {
  findByCrystal,
  findById,
  findByJournalId,
  findByIdForCrystalsJournals
};

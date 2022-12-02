import pool from "../configs/db.js";

// Get all account types.
const getAccountTypes = async (req, res) => {
  try {
    const accountTypes = await pool.query(
      `SELECT * FROM account_type ORDER BY id_account_type ASC`
    );
    res.json(accountTypes.rows);
  } catch (error) {
    console.log(error);
  }
};

export { getAccountTypes };

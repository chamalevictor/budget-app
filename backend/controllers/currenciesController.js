import pool from "../configs/db.js";

// Get all currencies.
const getCurrencies = async (req, res) => {
  try {
    const currencies = await pool.query(
      `SELECT * FROM currency ORDER BY id_currency ASC`
    );
    res.json(currencies.rows);
  } catch (error) {
    console.log(error);
  }
};

export { getCurrencies };

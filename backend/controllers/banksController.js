import pool from "../configs/db.js";

// Get all banks.
const getBanks = async (req, res) => {
  try {
    const banks = await pool.query(`SELECT * FROM bank ORDER BY id_bank ASC`);
    res.json(banks.rows);
  } catch (error) {
    console.log(error);
  }
};

export { getBanks };

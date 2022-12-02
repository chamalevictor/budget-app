import pool from "../configs/db.js";

// Get all categories.
const getCategories = async (req, res) => {
  try {
    const categories = await pool.query(
      `SELECT * FROM category ORDER BY id_category`
    );
    res.json(categories.rows);
  } catch (error) {
    console.log(error);
  }
};

export { getCategories };

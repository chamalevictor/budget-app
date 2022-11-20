import jwt from "jsonwebtoken";
import pool from "../configs/db.js";

const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await pool.query(
        `SELECT id_end_user, name, lastname, email FROM end_user WHERE id_end_user = $1`,
        [decoded.id]
      );
      return next();
    } catch (error) {
      return res.json({ msg: "Hubo un error. " });
    }
  }

  if (!token) {
    const error = new Error("Token no válido");
    return res.json({ msg: error.message });
  }
  next();
};

export default checkAuth;

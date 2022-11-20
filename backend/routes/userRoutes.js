import express from "express";
import {
  createUser,
  authenticateUser,
  confirmAccount,
  forgotPassword,
  validateToken,
  newPassword,
  profile,
} from "../controllers/userController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

// Authenticate, register and confirm users
router.post("/", createUser); // Create user
router.post("/login", authenticateUser);
router.get("/confirm_account/:token", confirmAccount);
router.post("/forgot_password", forgotPassword);
router.route("/forgot_password/:token").get(validateToken).post(newPassword);
router.get("/profile", checkAuth, profile);

export default router;

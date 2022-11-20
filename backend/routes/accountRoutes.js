import express from "express";
import {
  getAccount,
  getAccounts,
  createAccount,
  updateAccount,
} from "../controllers/accountController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, getAccounts).post(checkAuth, createAccount);
router.route("/:id").get(checkAuth, getAccount).put(checkAuth, updateAccount);

export default router;

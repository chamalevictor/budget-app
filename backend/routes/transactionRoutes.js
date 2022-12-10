import express from "express";
import {
  getTransactions,
  newTransaction,
  makeTransfer,
} from "../controllers/transactionController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();
router.post("/transfer", checkAuth, makeTransfer);
router
  .route("/")
  .get(checkAuth, getTransactions)
  .post(checkAuth, newTransaction);

export default router;

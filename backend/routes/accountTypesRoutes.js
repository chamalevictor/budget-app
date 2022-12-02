import express from "express";
import { getAccountTypes } from "../controllers/accountTypesController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();
router.route("/").get(checkAuth, getAccountTypes);

export default router;

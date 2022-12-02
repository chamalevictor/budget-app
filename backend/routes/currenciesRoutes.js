import express from "express";
import { getCurrencies } from "../controllers/currenciesController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();
router.route("/").get(checkAuth, getCurrencies);

export default router;

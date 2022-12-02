import express from "express";
import { getBanks } from "../controllers/banksController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();
router.route("/").get(checkAuth, getBanks);

export default router;

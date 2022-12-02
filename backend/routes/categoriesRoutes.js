import express from "express";
import { getCategories } from "../controllers/categoriesController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();
router.route("/").get(checkAuth, getCategories);

export default router;

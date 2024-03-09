import express from "express";
import { CalorieIntake, getWeeklyCalorieIntake } from "../controllers/calorie.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/calorieIntake/:id",authMiddleware,CalorieIntake);
router.get("/weeklyCalorieIntake/:id",authMiddleware,getWeeklyCalorieIntake);



export default router;
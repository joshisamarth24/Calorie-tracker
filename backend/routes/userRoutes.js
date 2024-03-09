import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { Update } from "../controllers/user.js";

const router = express.Router();

router.patch("/update/:id",authMiddleware,Update);

export default router;

import express from "express";

import {
  registerUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
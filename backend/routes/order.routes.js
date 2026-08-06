import express from "express";

import {
  placeOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", placeOrder);

router.get("/user/:userId", getOrdersByUser);

router.get("/:id", getOrderById);

router.put("/:id/status", updateOrderStatus);

export default router;
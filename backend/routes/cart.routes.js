import express from "express";

import {
  getCart,
  addItemToCart,
  removeItemFromCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/:userId", getCart);

router.post("/:userId/items", addItemToCart);

router.delete("/:userId/items/:itemId", removeItemFromCart);

export default router;
import express from "express";
import mongoose from "mongoose";
import Products from "../models/products.model.js";

const router = express.Router();

// CREATE
router.post("/create", async (req, res) => {
  try {
    const product = await Products.create(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// GET ALL
router.get("/all", async (req, res) => {
  try {
    const products = await Products.find({});

    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found"
      });
    }

    res.status(200).json({
      message: "Products found successfully",
      products
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// PAGINATION
router.get("/all/:pageNumber", async (req, res) => {
  try {
    const pageNumber = Number(req.params.pageNumber);
    const limit = 5;

    const products = await Product.find({})
      .limit(limit)
      .skip((pageNumber - 1) * limit);

    res.status(200).json({
      message: "Products found successfully",
      products
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      product
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


export default router;
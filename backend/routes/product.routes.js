import express from "express";
import Product from "../models/products.model.js";
const router = express.Router();


//create
router.post('/create', async (req, res)=>{
    const data = req.body;

    const product = await Product.create(data);

    if(!product){
        return res.status(500).json({
            message:"Product couldnt be created"
        })
    }

    res.status(201).json({
        message:"Product created successfully",
        product:product
    })
})

//all

router.get("/all", async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      message: "Products found successfully",
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//pageination
router.get("/all/:pageNumber", async (req, res)=>{
    try{

        const pageNumber = req.params.pageNumber;
        console.log(pageNumber);
        const limit = 5;
        const products = await Product.find({})
                                        .limit(limit)
                                        .skip((pageNumber-1)*limit);

        // limit, skip 
        // limit=5 means one a single page we'll show only 5 products


        if(!products){
            return res.status(400).json({
                message:"No products found"
            })
        }

        return res.status(200).json({
            message:"Products found successfully",
            products
        })


    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})

router.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ product });
});

router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body, // fields to update (name, price, description, etc.)
      {
        new: true,        // return the updated product
        runValidators: true, // validate against schema
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Delete product
router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
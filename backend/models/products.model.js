import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 10
  },
  category: {
    type: String,
    enum: [
      "Electronics",
      "Clothing",
      "Footwear",
      "Home Appliances",
      "Fitness",
      "Appliances",
      "Accessories",
      "Furniture",
      "Fashion",
      "Kitchen",
      "Home Decor"
    ]
  },
  stock: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  images: [
    {
      type: String
    }
  ],
  isAvailable: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
});

const Products = mongoose.model("Product", productSchema);

export default Products;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const SingleProduct = () => {
  const { id } = useParams(); // product id from route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {product && (
        <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-6">
          {/* Product Image */}
          <img
            src={product.image || "https://via.placeholder.com/400x300"}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md mb-6"
          />

          {/* Product Info */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-blue-600 mb-6">
            ₹{product.price}
          </p>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Buy Now
            </button>
            <button className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;

import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/products/all"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.slice(0, 4).map((product) => (
        <div
          key={product._id}
          className="
            group
            bg-white
            rounded-2xl
            border border-gray-100
            overflow-hidden
            transition-all duration-300
            hover:-translate-y-1
            hover:border-gray-200
            hover:shadow-xl
            hover:shadow-gray-200/60
          "
        >
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50 overflow-hidden">
            <img
              src={product.Images?.[0]}
              alt={product.name}
              className="
                w-full h-full
                object-cover
                group-hover:scale-105
                transition-transform duration-500
              "
            />

            {/* Bestseller */}
            <span
              className="
                absolute top-4 left-4
                px-3 py-1
                rounded-full
                bg-gray-900
                text-white
                text-xs font-semibold
              "
            >
              Bestseller
            </span>

            {/* Wishlist */}
            <button
              type="button"
              className="
                absolute top-4 right-4
                w-10 h-10
                rounded-full
                bg-white/90
                backdrop-blur-sm
                flex items-center justify-center
                text-lg
                shadow-sm
                hover:bg-white
                hover:scale-105
                transition
              "
            >
              ♡
            </button>
          </div>

          {/* Product Information */}
          <div className="p-5">

            {/* Category */}
            <p className="text-xs font-medium uppercase tracking-wider text-indigo-600">
              {product.category}
            </p>

            {/* Product Name */}
            <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-1">
              {product.name}
            </h3>

            {/* Description */}
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              <span className="text-yellow-500">
                ★
              </span>

              <span className="text-sm font-medium text-gray-700">
                4.8
              </span>

              <span className="text-sm text-gray-400">
                (124)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xl font-bold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              <span className="text-sm text-gray-400 line-through">
                ₹{(product.price + 500).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Stock */}
            <p className="mt-2 text-xs text-gray-500">
              {product.stock} items available
            </p>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">

              {/* VIEW PRODUCT */}
              <Link
                to={`/products/${product._id}`}
                className="
                  flex-1
                  text-center
                  py-2.5
                  rounded-lg
                  border border-gray-200
                  text-sm font-semibold
                  text-gray-700
                  hover:bg-gray-50
                  transition
                "
              >
                View
              </Link>

              {/* ADD TO CART */}
              <button
                type="button"
                className="
                  flex-1
                  py-2.5
                  rounded-lg
                  bg-gray-900
                  text-white
                  text-sm font-semibold
                  hover:bg-indigo-600
                  transition
                "
              >
                Add to Cart
              </button>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestSeller;
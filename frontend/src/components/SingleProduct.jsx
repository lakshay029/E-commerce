import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH PRODUCT
  // =========================
  useEffect(() => {
    const fetchProduct = async () => {
      // Prevent request if ID is missing
      if (!id || id === "undefined") {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        console.log("Fetching product ID:", id);

        const response = await fetch(
          `http://localhost:3000/products/${id}`
        );

        const data = await response.json();
        

        console.log("Product API response:", data);

        if (!response.ok) {
          throw new Error(data.message || "Product not found");
        }

        if (!data.product) {
          throw new Error("Product data is missing from server response");
        }

        setProduct(data.product);

        // Handle images
        if (data.product.images?.length > 0) {
          setSelectedImage(data.product.images[0]);
        } else if (data.product.Images?.length > 0) {
          // Support your old "Images" field too
          setSelectedImage(data.product.Images[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);

        setError(
          error.message || "Something went wrong while fetching the product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">
            😕
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>

          <p className="text-gray-500 mb-6">
            {error}
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Go Back
            </button>

            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // PRODUCT SAFETY CHECK
  // =========================
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Product not available.
        </p>
      </div>
    );
  }

  // Support both "images" and your previous "Images"
  const images =
    product.images?.length > 0
      ? product.images
      : product.Images?.length > 0
      ? product.Images
      : [];

  // =========================
  // QUANTITY
  // =========================
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = () => {
    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: images[0] || ""
    };

    console.log("Adding to cart:", cartItem);

    // Get existing cart
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists
    const existingProductIndex = existingCart.findIndex(
      (item) => item.productId === product._id
    );

    if (existingProductIndex !== -1) {
      const newQuantity =
        existingCart[existingProductIndex].quantity + quantity;

      // Don't exceed stock
      existingCart[existingProductIndex].quantity = Math.min(
        newQuantity,
        product.stock
      );
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Product added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =========================
          HEADER
      ========================= */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-black transition flex items-center gap-2"
          >
            ← Back to Products
          </button>

        </div>
      </header>

      {/* =========================
          PRODUCT SECTION
      ========================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">

            {/* =========================
                IMAGE SECTION
            ========================= */}
            <div>

              {/* Main Image */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">

                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/600x600?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-6xl mb-3">
                      📦
                    </div>

                    <p>
                      No image available
                    </p>
                  </div>
                )}

              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">

                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSelectedImage(image)
                      }
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === image
                          ? "border-black"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}

                </div>
              )}

            </div>

            {/* =========================
                PRODUCT INFORMATION
            ========================= */}
            <div className="flex flex-col">

              {/* Category */}
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                {product.category || "Product"}
              </p>

              {/* Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">

                <div className="flex text-yellow-400">
                  ★★★★★
                </div>

                <span className="text-sm text-gray-500">
                  4.8 (120 reviews)
                </span>

              </div>

              {/* Price */}
              <div className="mb-6">

                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

              </div>

              {/* Description */}
              <div className="border-t border-b py-6 mb-6">

                <h2 className="font-semibold text-lg mb-3">
                  Description
                </h2>

                <p className="text-gray-600 leading-7">
                  {product.description ||
                    "No description available for this product."}
                </p>

              </div>

              {/* Stock */}
              <div className="mb-6">

                {product.stock > 0 ? (
                  <div className="flex items-center gap-2">

                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>

                    <span className="text-green-600 font-medium">
                      In Stock
                    </span>

                    <span className="text-gray-500 text-sm">
                      ({product.stock} available)
                    </span>

                  </div>
                ) : (
                  <div className="flex items-center gap-2">

                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>

                    <span className="text-red-600 font-medium">
                      Out of Stock
                    </span>

                  </div>
                )}

              </div>

              {/* =========================
                  QUANTITY
              ========================= */}
              {product.stock > 0 && product.isAvailable && (
                <div className="mb-6">

                  <p className="font-medium mb-3">
                    Quantity
                  </p>

                  <div className="flex items-center border border-gray-300 rounded-lg w-fit">

                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="w-11 h-11 text-xl hover:bg-gray-100 disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>

                    <button
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="w-11 h-11 text-xl hover:bg-gray-100 disabled:opacity-40"
                    >
                      +
                    </button>

                  </div>

                </div>
              )}

              {/* =========================
                  BUTTONS
              ========================= */}
              <div className="mt-auto">

                {product.stock > 0 && product.isAvailable ? (

                  <div className="flex flex-col sm:flex-row gap-3">

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => {
                        handleAddToCart();
                        navigate("/cart");
                      }}
                      className="flex-1 border-2 border-black text-black py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition"
                    >
                      Buy Now
                    </button>

                  </div>

                ) : (

                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-3.5 rounded-xl font-semibold cursor-not-allowed"
                  >
                    Out of Stock
                  </button>

                )}

              </div>

            </div>

          </div>

        </div>

        {/* =========================
            PRODUCT DETAILS
        ========================= */}
        <div className="bg-white rounded-2xl shadow-sm mt-6 p-6 lg:p-8">

          <h2 className="text-2xl font-bold mb-6">
            Product Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Category
              </p>

              <p className="font-medium mt-1">
                {product.category || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Availability
              </p>

              <p className="font-medium mt-1">
                {product.isAvailable
                  ? "Available"
                  : "Unavailable"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Product ID
              </p>

              <p className="font-medium mt-1 break-all">
                {product._id}
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default SingleProduct;
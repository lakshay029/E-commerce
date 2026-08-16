import React, { useState, useEffect } from "react";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/products/all");
      if (!response.ok) throw new Error("No products found");
      const receievedData = await response.json();
      setProducts(receievedData.products);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMin = minPrice === "" || prod.price >= Number(minPrice);
    const matchesMax = maxPrice === "" || prod.price <= Number(maxPrice);
    return matchesSearch && matchesMin && matchesMax;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* 🔍 Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-32 border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-32 border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod._id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
          >
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-gray-800">{prod.name}</h1>
              <h2 className="text-gray-600">Price: ₹{prod.price}</h2>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Buy Now
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;

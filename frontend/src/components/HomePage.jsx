import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BestSeller from "./BestSeller";

const HomePage = () => {


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* 🔹 Hero Banner */}
      <header className="relative bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to My E-commerce</h1>
          <p className="text-lg mb-6">
            Discover amazing products at unbeatable prices!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
            >
              {/* Sign Up  */}
            </button>
          </div>
        </div>
      </header>

      {/* 🔹 Search Bar */}
      {/* <div className="flex justify-center mt-6 px-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg border rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div> */}

      {/* 🔹 Product Grid */}
      <BestSeller />

      {/* 🔹 Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white">About Us</a>
            <a href="#" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

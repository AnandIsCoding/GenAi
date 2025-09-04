import React, { useState } from "react";
import toast from "react-hot-toast";

import { products } from "../utils/Products";
import ScrollToTop from "../utils/ScrollToTop";

const allProducts = products;

function ProductRecommendations() {
  const [selected, setSelected] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getRecommendations = async () => {
    if (selected.length === 0) {
      return toast.error("Please select at least one product.");
    }
    setLoading(true);
    setRecommendations([]);

    const payload = {
      selectedProducts: allProducts.filter((p) => selected.includes(p.id)),
      allProducts,
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_PRODUCT_RECOMMENDATION,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      setRecommendations(data.recommendations || []);
      if (window.innerWidth <= 768) {
        // mobile breakpoint (Tailwind's md)
        toast.success("Please scroll below to view recommended products");
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const colors = [
    "bg-red-50",
    "bg-blue-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-purple-50",
    "bg-pink-50",
    "bg-indigo-50",
  ];

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row text-white"
      style={{
        backgroundImage: `url('https://cdn.dribbble.com/userupload/44764530/file/3ccc259edf13ed795acbf83a87b1b447.png?resize=1504x1736&vertical=center')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ScrollToTop />
      {/* Left Panel */}
      <div className="w-full lg:w-3/5 h-full overflow-y-auto   p-6 custom-scrollbar">
        {/* Top heading + button row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              🤖 AI Product Recommendations
            </h1>
            <p className="text-black text-sm sm:text-base">
              Select products (scrollable) & click button.
            </p>
          </div>
          <button
            onClick={getRecommendations}
            disabled={loading}
            className={`px-4 cursor-pointer sm:px-6 py-2 sm:py-3 rounded-full text-white font-medium transition 
            ${
              loading
                ? " cursor-not-allowed bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500"
            }`}
          >
            {loading ? "🤖 Getting Recommendations..." : "Get Recommendations"}
          </button>
        </div>

        {/* Products grid */}
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
          {allProducts.map((product, index) => {
            const bgColor = colors[index % colors.length];
            return (
              <div
                key={product.id}
                className={`w-40 sm:w-44 p-4 rounded-xl cursor-pointer transition-transform transform hover:scale-105
                  border ${
                    selected.includes(product.id)
                      ? `${bgColor}  shadow-lg`
                      : `${bgColor} border-white/20`
                  }`}
                onClick={() => toggleSelect(product.id)}
              >
                <h4 className="font-semibold text-black/90">{product.name}</h4>
                <p className="text-sm text-black/80">
                  Category: {product.category}
                </p>
                <p className="text-sm text-black/80">₹{product.price}</p>
                <p
                  className={`text-xs mt-1 ${
                    selected.includes(product.id)
                      ? "text-emerald-600"
                      : "text-gray-700"
                  }`}
                >
                  {selected.includes(product.id)
                    ? "✓ Selected"
                    : "Click to select"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-2/5 h-full overflow-y-auto p-6 mt-6 lg:mt-0 ">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
          Recommended For You
        </h2>
        {recommendations.length === 0 && (
          <p className="text-black text-sm sm:text-base">
            No recommendations yet. Select products & click button.
          </p>
        )}
        {/* grid of small cards */}
        <div className="flex flex-wrap gap-4 justify-center">
          {recommendations.map((item, index) => {
            const bgColor = colors[index % colors.length];
            return (
              <div
                key={index}
                className={`w-32 sm:w-40 p-4 rounded-xl ${bgColor} backdrop-blur-md 
                  transition-transform transform hover:scale-105 shadow-md`}
              >
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-700">₹{item.price}</p>
                <p className="text-xs text-gray-700">{item.category}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductRecommendations;

import React, { useState } from "react";

// Large product dataset without images
import { products } from '../utils/Products';
const allProducts = products;

function ProductRecommendations() {
  const [selected, setSelected] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false); // Added for loading state

  // Toggle selection
  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Fetch recommendations from n8n webhook
  const getRecommendations = async () => {
    if (selected.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    setLoading(true); // Set loading to true
    setRecommendations([]); // Clear previous recommendations

    const payload = {
      selectedProducts: allProducts.filter(p => selected.includes(p.id)),
      allProducts
    };

    try {
      const response = await fetch(import.meta.env.VITE_PRODUCT_RECOMMENDATION, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });


      // **FIX**: Check if the response is successful before parsing JSON
      if (!response.ok) {
        // Get the raw text from the server response to see the actual error
        const errorText = await response.text();
        console.error("Server responded with an error:", response.status, errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('response is --->> ',response)

      const text = await response.text();
const data = text ? JSON.parse(text) : {};

      console.log("Received data:", data);
      console.log('recommendations --> ',data.recommendations || [])
      setRecommendations(data.recommendations || []);

    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      alert("Error fetching recommendations. Check the browser console for more details.");
    } finally {
      setLoading(false); // Set loading to false in both success and error cases
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Product Recommendations</h1>
      <p>Select one or more products below to get personalized recommendations.</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {allProducts.map(product => (
          <div
            key={product.id}
            style={{
              border: selected.includes(product.id) ? "2px solid #10B981" : "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "150px",
              cursor: "pointer",
              transition: "transform 0.2s",
              boxShadow: selected.includes(product.id) ? "0 4px 6px rgba(0,0,0,0.1)" : "none"
            }}
            onClick={() => toggleSelect(product.id)}
          >
            <h4>{product.name}</h4>
            <p style={{ fontSize: "14px" }}>Category: {product.category}</p>
            <p style={{ fontSize: "14px" }}>Price: ₹{product.price}</p>
            <p style={{ fontSize: "12px", color: selected.includes(product.id) ? "#10B981" : "#666" }}>
              {selected.includes(product.id) ? "✓ Selected" : "Click to select"}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={getRecommendations}
        disabled={loading} // Disable button while loading
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          cursor: "pointer",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px"
        }}
      >
        {loading ? "Getting Recommendations..." : "Get Recommendations"}
      </button>

      {recommendations.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Recommended For You</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {recommendations.map(item => (
              <li key={item.id} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
                <strong>{item.name}</strong> - ₹{item.price} ({item.category})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProductRecommendations;
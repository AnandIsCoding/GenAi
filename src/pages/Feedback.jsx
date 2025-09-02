// FeedbackDashboard.jsx
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { loadFeedbacks, playSuccessSound, saveFeedbacks } from "../utils/Feedback";

export default function Feedback() {
  // init Gemini client
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const [feedbacks, setFeedbacks] = useState([]);

  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  // 🔹 Load feedbacks from localStorage when component mounts
  useEffect(() => {
    setFeedbacks(loadFeedbacks());
  }, []);

  // 🔹 Save feedbacks whenever they change
  useEffect(() => {
    if (feedbacks.length > 0) {
      saveFeedbacks(feedbacks);
    }
  }, [feedbacks]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  

 // Step 1: Check if feedback already submitted
  if (feedbacks?.length >= 2) {
    toast.error("Looks like you’ve already submitted Feedback. We appreciate your enthusiasm!");
    return;
  }
  // Step 1: show AI analyzing toast
  let toastId = toast.loading("🤖 Analyzing your feedback with AI...");



  try {
    // 1. Ask Gemini to classify comment
    const prompt = `Classify the following feedback into one of these categories: Positive, Negative, Neutral. 
    Just return the category word only. 
    Feedback: "${comment}"`;

    const result = await model.generateContent(prompt);
    const category = result.response.text().trim();

    const payload = { email, rating, comment, category };

    // Step 2: update toast to "creating entry"
    toast.dismiss(toastId); // remove old one
    toastId = toast.loading("📝 Creating your feedback entry...");

    // 2. Send to n8n webhook
    await axios.post(import.meta.env.VITE_FEEDBACK_N8N_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    // 3. Update local state (prepend new feedback at top)
    setFeedbacks((prev) => [payload, ...prev]);

    // 4. Reset form
    setEmail("");
    setRating("");
    setComment("");

    // ✅ Step 3: success toast
    toast.success("✅ Feedback analyzed & saved successfully!", {
      id: toastId,
    });
    playSuccessSound()
  } catch (error) {
    console.error("Error in handleSubmit:", error);

    const fallbackCategory = "Neutral";
    const payload = { email, rating, comment, category: fallbackCategory };

    // retry save
    await axios.post(import.meta.env.VITE_FEEDBACK_N8N_URL, payload);
    setFeedbacks((prev) => [payload, ...prev]);

    toast.error("⚠️ Something went wrong. Saved as Neutral.", {
      id: toastId,
    });
  }
};

  return (
    <div style={{
              backgroundImage: `url('https://cdn.dribbble.com/userupload/44735735/file/7445b7a6edb4e7b439ac67eefefa126e.jpg?resize=1504x1127&vertical=center)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(1)",
            }} className="bg-black min-h-screen flex flex-col items-center justify-center px-1 md:px-4">
      {/* Form Card */}
      <div className="w-full max-w-lg bg-gray-900 shadow-xl rounded-2xl p-1 md:p-8 transform transition duration-500 hover:scale-[1.01] hover:shadow-indigo-500/30">
        <h1 className="text-3xl font-bold text-indigo-400 mb-8 text-center">
          Feedback Dashboard
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2 cursor-pointer"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2  text-white border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Rating */}
          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-white mb-2 cursor-pointer"
            >
              Rating (1–5)
            </label>
            <input
              id="rating"
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              className="w-full px-4 py-2 bg-black text-white border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              placeholder="Give a rating"
            />
          </div>

          {/* Comment */}
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-white mb-2 cursor-pointer"
            >
              Feedback
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              id="comment"
              rows={3}
              className="w-full px-4 py-2 bg-black text-white border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 resize-none"
              placeholder="Write your feedback..."
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            title="confirm and submit feedback"
            className="w-full cursor-pointer bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transform transition duration-300 hover:scale-105 hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Table Section */}
      {feedbacks.length > 0 && (
        <div className="w-full max-w-4xl mt-12 animate-fadeIn">
          <div className="overflow-x-auto rounded-lg shadow-lg shadow-indigo-500/20">
            <table className="w-full bg-gray-900 text-gray-200 rounded-lg">
              <thead className="bg-indigo-600 text-white text-sm uppercase">
                <tr>
                  <th className="py-3 px-4 text-left">email</th>
                  <th className="py-3 px-4 text-left">Rating</th>
                  <th className="py-3 px-4 text-left">Comment</th>
                  <th className="py-3 px-4 text-left">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {feedbacks.map((f, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-800 transition-colors duration-300"
                  >
                    <td className="py-3 px-4">{f.email}</td>
                    <td className="py-3 px-4">{f.rating}</td>
                    <td className="py-3 px-4">{f.comment}</td>
                    <td className="py-3 px-4 text-indigo-400">{f.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

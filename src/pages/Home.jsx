import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Download } from "lucide-react";
import ScrollToTop from "../utils/ScrollToTop";

const projects = [
  {
    title:
      "Combined AI – Multi-Tool AI Platform (Gemini + ClipDrop + Cloudinary + Clerk Auth)",
    description:
      "An all-in-one AI web application. It features : Blog title generation, Article generation, text-to-image generation, background and object removal, résumé analysis, and a community section where users can publish and like creations. Powered by Google Gemini for LLM responses and ClipDrop AI.",
    image: "/CombinedAi.png",
    liveLink: "https://mycombinedai.vercel.app/",
    githubLink: "https://github.com/AnandIsCoding/Combined-AI",
  },
  {
    title:
      "Feedback System with AI analysis + n8n + Spreadsheet + Gmail Auto Response + Telegram Integration",
    description:
      "A modern feedback system integrating n8n automations, spreadsheets, Gmail auto-response, and Telegram notifications. Explore the live demo or view source code.",
    image: "/FeedbackDashboardImage.png",
    liveLink: "/feedback",
    githubLink: "https://github.com/AnandIsCoding/GenAi",
  },
  {
    title: "E-Commerce Product Recommendation System using n8n",
    description:
      "An AI-powered recommendation engine for e-commerce built with n8n automations. This project showcases a real-life use case of AI Agent workflows to analyze user behavior, personalize product suggestions, and automate marketing flows. Integrated with external APIs and real-time recommendations.",
    image: "/ProductRecommendation.png",
    liveLink: "/product-recommendation",
    githubLink: "https://github.com/AnandIsCoding/GenAi",
  },
];

const slideIn = (direction) => ({
  hidden: { opacity: 0, y: direction === "up" ? 40 : 0, x: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
});

function Home() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          videoRef.current.muted = true;
          videoRef.current.play();
          setMuted(true);
        });
      }
    }
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

 

  return (
    <div className="relative w-full min-h-screen overflow-hidden p-4 md:p-8">
      <ScrollToTop />

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="fixed cursor-pointer border bg-white z-30 top-4 right-4 p-3 rounded-full text-black hover:scale-105 transition"
        title="Toggle audio"
      >
        {muted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>

      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={muted}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://cdn.dribbble.com/userupload/44132917/file/original-c1986c25852f9d14a611e8d999c4a747.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Header */}
    
<div className="relative z-20 text-center mb-12 mt-10">
  <motion.h1
    className="text-4xl md:text-5xl font-extrabold text-white"
    initial={{ opacity: 0, y: -50 }}           // start invisible, above
    animate={{ opacity: 1, y: 0 }}             // fade in + slide down
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    My Gen-AI 🤖 Projects
  </motion.h1>

  <motion.p
    className="text-gray-200 mt-3 text-lg"
    initial={{ opacity: 0, y: -30 }}           // start a bit above
    animate={{ opacity: 1, y: 0 }}             // fade in + slide down
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // delay for nice stagger
  >
    A growing portfolio of AI + automation experiments & tools
  </motion.p>
</div>


      {/* Grid of Cards */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden flex flex-col border border-white/10 hover:shadow-xl transition-transform"
            whileHover={{ scale: 1.02 }}
            initial="hidden"
            animate="visible"
            variants={slideIn("up")}
          >
            <div className="h-56 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="flex flex-col p-6 bg-gradient-to-br from-black/30 to-black/10 backdrop-blur-md flex-1">
              <h2 className="text-xl font-extrabold text-white mb-2 leading-tight hover:text-indigo-300 transition">
                {project.title}
              </h2>
              <p className="text-gray-200 mb-5 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="flex gap-3 flex-wrap mt-auto">
                <NavLink
                  to={project.liveLink}
                  target="blank"
                  title="Live Demo"
                  className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-md hover:opacity-90 transition-transform transform hover:-translate-y-1"
                >
                  Live Demo
                </NavLink>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub Repo"
                  className="px-5 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-transform transform hover:-translate-y-1 shadow-md hover:shadow-gray-500/40"
                >
                  GitHub
                </a>
               
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;

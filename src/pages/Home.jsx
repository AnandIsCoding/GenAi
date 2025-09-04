import { motion } from "framer-motion";
import { useEffect,useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import ScrollToTop from "../utils/ScrollToTop";

const projects = [
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
    title: "E-Commerce Product Recommendation system using n8n",
    description:
      "This project includes a real life use case of AI Agent automation using n8n",
    image: "/ProductRecommendation.png",
    liveLink: "/product-recommendation",
    githubLink: "https://github.com/AnandIsCoding/GenAi",
  },
];

const slideIn = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -100 : 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
});

function Home() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);

  // Play video on mount and ensure it's audible
  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay with sound blocked, fallback: play muted
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
    <div className="relative w-full min-h-screen overflow-hidden flex flex-wrap justify-center md:items-center gap-6 p-4 pt-18 md:pt-0">
     <ScrollToTop/>
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="fixed cursor-pointer border bg-white z-30 top-4 right-4 p-3  rounded-full text-black hover:scale-105 transition"
        title="click to turn on audio"
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
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Project Cards */}
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="relative bg-[#00000089] rounded-3xl shadow-2xl overflow-hidden cursor-pointer flex flex-col md:flex-row w-full md:w-[48%] h-auto md:h-80 z-20"
          whileHover={{
            scale: 1.03,
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.7), 0 0 40px rgba(99,102,241,0.5)",
          }}
          initial="hidden"
          animate="visible"
          variants={slideIn(index % 2 === 0 ? "left" : "right")}
        >
          <div className="w-full md:w-1/3 h-64 md:h-auto relative z-10 p-2 rounded-l-3xl">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-r-none shadow-lg"
            />
          </div>

          <div className="w-full md:w-2/3 relative z-10 flex flex-col p-6 bg-black/20 backdrop-blur-md rounded-b-3xl md:rounded-r-3xl md:rounded-l-none">
            <h2 className="text-2xl font-extrabold text-white mb-4 hover:text-indigo-400 transition-colors duration-300">
              {project.title}
            </h2>
            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              {project.description}
            </p>

            <div className="flex gap-4 flex-wrap">
              <NavLink
                to={project.liveLink}
                title='Redirect to see live project'
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-transform transform hover:-translate-y-1 shadow-md hover:shadow-indigo-400/50"
              >
                Click to view
              </NavLink>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                 title='Redirect to Github repo of this project'
                className="px-5 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-transform transform hover:-translate-y-1 shadow-md hover:shadow-gray-400/50"
              >
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Home;

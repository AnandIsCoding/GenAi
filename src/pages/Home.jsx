import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const projects = [
  {
    title:
      "Feedback System with n8n + Spreadsheet + Gmail Auto Response + Telegram Integration",
    description:
      "A modern feedback system integrating n8n automations, spreadsheets, Gmail auto-response, and Telegram notifications. Explore the live demo or view source code.",
    image: "/FeedbackDashboardImage.png",
    liveLink: "/feedback",
    githubLink: "https://github.com/AnandIsCoding/GenAi",
  },
  {
    title: "Another GenAi Projects with Awesome Features with RAG, n8n workflows, Gemini",
    description:
      "This is a placeholder for my upcoming GenAi projects with awesome features. placeholder for my upcoming GenAi projects with awesome features",
    image: "/FeedbackDashboardImage.png",
    liveLink: "/feedback",
    githubLink: "#",
  },
];

// Variants for sliding in from left or right
const slideIn = (direction) => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -100 : 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
});

function Home() {
  return (
    <div style={{
              backgroundImage: `url('https://cdn.dribbble.com/userupload/44735735/file/7445b7a6edb4e7b439ac67eefefa126e.jpg?resize=1504x1127&vertical=center)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(1)",
            }} className="min-h-screen bg-gray-900 flex flex-wrap justify-center md:items-center gap-6 p-4 overflow-x-hidden">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="relative bg-[#0000008b] rounded-3xl shadow-2xl overflow-hidden cursor-pointer flex flex-col md:flex-row w-full md:w-[48%] h-auto md:h-80"
          whileHover={{
            scale: 1.03,
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.7), 0 0 40px rgba(99,102,241,0.5)",
          }}
          initial="hidden"
          animate="visible"
          variants={slideIn(index % 2 === 0 ? "left" : "right")} // left for first, right for second
        >
          {/* Left Image (top on mobile, left on md+) */}
          <div className="w-full md:w-1/3 h-64 md:h-auto relative z-10 p-2 rounded-l-3xl">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-r-none shadow-lg"
            />
          </div>

          {/* Right Content (bottom on mobile, right on md+) */}
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
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-transform transform hover:-translate-y-1 shadow-md hover:shadow-indigo-400/50"
              >
                Click to view
              </NavLink>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
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

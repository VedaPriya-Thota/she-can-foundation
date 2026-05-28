import { motion } from "framer-motion";

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const statCardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 25 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-20"
    >
      {/* Background ambient radial glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Text Block */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p 
            variants={textItemVariants}
            className="text-pink-400 font-semibold mb-4 tracking-wider text-sm uppercase"
          >
            Empowering Women Through Technology & Support
          </motion.p>

          <motion.h1 
            variants={textItemVariants}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white"
          >
            Building a
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {" "}Stronger Future{" "}
            </span>
            Together
          </motion.h1>

          <motion.p 
            variants={textItemVariants}
            className="text-gray-300 text-lg leading-relaxed mb-8"
          >
            She Can Foundation is dedicated to supporting, empowering,
            and uplifting women through education, mentorship,
            opportunities, and community initiatives.
          </motion.p>

          <motion.div variants={textItemVariants}>
            <button 
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-pink-500/20"
            >
              Get Support
            </button>
          </motion.div>
        </motion.div>

        {/* Right Stats Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
        >
          <motion.div 
            variants={statsContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-6"
          >
            {/* Stat 1 */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ scale: 1.05, borderColor: "rgba(236,72,153,0.3)" }}
              className="bg-white/5 border border-white/5 p-6 rounded-2xl transition-all duration-300"
            >
              <h2 className="text-4xl font-bold text-pink-400">10K+</h2>
              <p className="text-gray-300 mt-2 text-sm">Women Supported</p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ scale: 1.05, borderColor: "rgba(139,92,246,0.3)" }}
              className="bg-white/5 border border-white/5 p-6 rounded-2xl transition-all duration-300"
            >
              <h2 className="text-4xl font-bold text-purple-400">500+</h2>
              <p className="text-gray-300 mt-2 text-sm">Mentorship Programs</p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ scale: 1.05, borderColor: "rgba(236,72,153,0.3)" }}
              className="bg-white/5 border border-white/5 p-6 rounded-2xl transition-all duration-300"
            >
              <h2 className="text-4xl font-bold text-pink-400">120+</h2>
              <p className="text-gray-300 mt-2 text-sm">Communities</p>
            </motion.div>

            {/* Stat 4 */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ scale: 1.05, borderColor: "rgba(139,92,246,0.3)" }}
              className="bg-white/5 border border-white/5 p-6 rounded-2xl transition-all duration-300"
            >
              <h2 className="text-4xl font-bold text-purple-400">24/7</h2>
              <p className="text-gray-300 mt-2 text-sm">Support Network</p>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
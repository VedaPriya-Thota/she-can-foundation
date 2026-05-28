import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Full Stack Engineer",
    story: "She Can Foundation completely transformed my career trajectory! The mentorship and free coding bootcamps helped me secure a software engineering role in under 9 months. The community support is truly unparalleled.",
    program: "Tech Career Accelerator",
    initials: "SJ",
    gradient: "from-pink-500/25 to-purple-500/5",
  },
  {
    id: 2,
    name: "Amina Al-Mansoor",
    role: "Product Manager",
    story: "I gained the practical management skills and industry confidence needed to lead cross-functional startup teams. Their women-led mentorship circles provided life-changing career guidance.",
    program: "Product Fellowship",
    initials: "AA",
    gradient: "from-purple-500/25 to-indigo-500/5",
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "UX/UI Designer",
    story: "As a working parent, finding supportive, self-paced skill sessions felt impossible. She Can gave me the tools, guidance, and network to successfully pivot into a remote design role.",
    program: "Creative Design Circle",
    initials: "ER",
    gradient: "from-pink-500/25 to-rose-500/5",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-pink-400 font-semibold mb-3 uppercase tracking-wider text-sm"
          >
            Empowerment Stories
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Stories of
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {" "}Uplift & Success
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Hear firsthand how our mentorship, support, and community networks have helped women around the globe achieve their dreams and build stronger futures.
          </motion.p>
        </div>

        {/* Grid Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((test) => (
            <motion.div
              key={test.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                borderColor: "rgba(236, 72, 153, 0.4)",
                boxShadow: "0 20px 40px -15px rgba(236, 72, 153, 0.1)"
              }}
              className={`bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden group`}
            >
              {/* Subtle background card gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${test.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg text-lg">
                      {test.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-white leading-tight">{test.name}</h4>
                      <p className="text-pink-400 text-xs mt-0.5">{test.role}</p>
                    </div>
                  </div>
                  <Quote size={28} className="text-white/20 group-hover:text-pink-400/40 transition-colors duration-300" />
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  "{test.story}"
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 mt-auto">
                <span className="text-[10px] uppercase tracking-wider text-purple-300 font-semibold bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20">
                  {test.program}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "How can I volunteer with She Can Foundation?",
    answer: "You can volunteer by becoming a mentor, facilitating technical skill workshops, coordinating community support circles, or helping with operations. To get started, send us a query using the contact form below, and our coordinator will follow up within 24-48 hours.",
  },
  {
    id: 2,
    question: "Are the mentorship programs and workshops free?",
    answer: "Yes, absolutely! All mentorship circles, coding bootcamps, resume review workshops, and community events are 100% free of charge for participants. We are fully funded by grants, corporate sponsorships, and generous community donors.",
  },
  {
    id: 3,
    question: "How do support sessions work?",
    answer: "Support sessions are held virtually both in 1-on-1 private rooms and structured peer groups. These sessions provide safe spaces to discuss challenges, seek mental health guidance, exchange professional struggles, and receive uplifts from peers and trained volunteers.",
  },
  {
    id: 4,
    question: "Can students join the technology workshops?",
    answer: "Definitely! Our workshops are designed to welcome students, career pivoters, professionals, and re-entry workers. We offer basic pathways for complete beginners, as well as intermediate and advanced cohorts to cater to all learning levels.",
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Visual background decorations */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-pink-400 font-semibold mb-3 uppercase tracking-wider text-sm"
          >
            Got Questions?
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Frequently Asked
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {" "}Questions
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto leading-relaxed"
          >
            Find quick answers to common queries regarding our volunteer initiatives, free program admission, support models, and mentorship workshops.
          </motion.p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-pink-500/35 bg-white/10" : "border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                >
                  <span className="font-semibold text-white md:text-lg pr-4 group-hover:text-pink-400 transition-colors">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    isOpen ? "bg-pink-500 border-pink-500 text-white" : "border-white/10 text-gray-400 bg-white/5"
                  }`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 text-gray-300 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;

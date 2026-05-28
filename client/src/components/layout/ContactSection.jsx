import { useState } from "react";
import toast from "react-hot-toast";
import { Send } from "lucide-react";
import { createMessage } from "../../api/messageApi";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    // Validation
    if (!name || !email || !message) {
      return toast.error("All fields are required");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email");
    }

    try {
      setLoading(true);

      const data = await createMessage(formData);

      if (data.success) {
        toast.success("Message submitted successfully");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Submission failed");
      }

    } catch (error) {
      console.error(error);
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900"
    >
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">

          <p className="text-pink-400 font-semibold mb-3">
            Contact & Support
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Reach Out To
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {" "}She Can Foundation
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are here to support, mentor, and empower women through
            opportunities, guidance, and community-driven initiatives.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-pink-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Message
              </label>

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/10 border border-white/10 outline-none resize-none focus:border-pink-500 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] transition duration-300 shadow-xl disabled:opacity-70"
            >
              {loading ? (
                "Submitting..."
              ) : (
                <>
                  Submit Message
                  <Send size={18} />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import Testimonials from "../components/layout/Testimonials";
import FAQ from "../components/layout/FAQ";
import ContactSection from "../components/layout/ContactSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-pink-500 selection:text-white">
      <Navbar />
      <Hero />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </div>
  );
};

export default Home;
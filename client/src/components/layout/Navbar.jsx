const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          She Can Foundation
        </h1>

        <div className="hidden md:flex gap-8 text-sm">
          <a href="#home" className="hover:text-pink-400 transition">
            Home
          </a>

          <a href="#contact" className="hover:text-pink-400 transition">
            Contact
          </a>

          <a
            href="/admin/login"
            className="bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 rounded-full hover:scale-105 transition"
          >
            Admin Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
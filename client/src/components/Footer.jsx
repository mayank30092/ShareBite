export default function Footer() {
  return (
    <footer className="bg-emerald-700 text-gray-300 py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand / About */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-3">ShareBite</h2>
          <p className="text-sm">
            Reducing food waste by connecting donors with those in need. Join us
            in making a difference, one meal at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-yellow-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-400 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-yellow-400 transition">
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:support@sharebite.org"
                className="hover:text-yellow-400"
              >
                support@sharebite.org
              </a>
            </li>
            <li>Phone: +91 98734 90275</li>
            <li>Location: New Delhi, India</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/mayank30092/ShareBite.git"
              className="hover:text-yellow-400 transition"
              target="_blank"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.instagram.com/mayank_mittal3/"
              target="_blank"
              className="hover:text-yellow-400 transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/mayankmittal30092/"
              target="_blank"
              className="hover:text-yellow-400 transition"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} ShareBite | Made with ❤️ by Team ShareBite
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="bg-emerald-800 text-gray-300 py-12 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-3">ShareBite</h2>
          <p className="text-sm leading-relaxed">
            Reducing food waste by connecting donors with those in need. Join us
            in making a difference, one meal at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/"
                className="hover:text-yellow-400 transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-yellow-400 transition duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-yellow-400 transition duration-200"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="hover:text-yellow-400 transition duration-200"
              >
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:support@sharebite.org"
                className="hover:text-yellow-400 transition duration-200"
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
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-5 text-xl">
            <a
              href="https://github.com/mayank30092/ShareBite.git"
              className="hover:text-yellow-400 transition duration-200"
              target="_blank"
            >
              <i className="fa-brands fa-github"></i>
            </a>

            <a
              href="https://www.instagram.com/mayank_mittal3/"
              target="_blank"
              className="hover:text-yellow-400 transition duration-200"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/mayankmittal30092/"
              target="_blank"
              className="hover:text-yellow-400 transition duration-200"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">ShareBite</span>| Made with
        ❤️ by <span className="text-yellow-400">Team ShareBite</span>
      </div>
    </footer>
  );
}

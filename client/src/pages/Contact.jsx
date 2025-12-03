import { motion } from "framer-motion";

export default function Contact() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-700 to-emerald-600 text-white py-20 px-6 text-center overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-52 h-52 bg-white opacity-10 rounded-full blur-3xl"></div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl md:text-6xl font-extrabold mb-4"
        >
          Contact Us 📞
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-lg max-w-2xl mx-auto opacity-90"
        >
          Have a question, suggestion, or want to collaborate? We're here to
          help!
        </motion.p>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          {/* Left Info Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-emerald-700 mb-6">
              Get in Touch
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Whether you're a food donor, volunteer, or someone seeking help,
              we’d love to hear from you.
              <span className="font-semibold text-emerald-700"> ShareBite</span>
              is here for everyone.
            </p>

            <ul className="space-y-4 text-gray-700">
              <li>
                📍 <span className="font-semibold">Address:</span> New Delhi,
                India
              </li>
              <li>
                📧 <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:support@sharebite.org"
                  className="text-emerald-700 font-medium hover:underline"
                >
                  support@sharebite.org
                </a>
              </li>
              <li>
                ☎️ <span className="font-semibold">Phone:</span> +91 98734 90275
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6 text-2xl">
              <a
                href="https://github.com/mayank30092/ShareBite.git"
                className="text-emerald-700 hover:text-emerald-900 transition"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.instagram.com/mayank_mittal3/"
                className="text-emerald-700 hover:text-emerald-900 transition"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/mayankmittal30092/"
                className="text-emerald-700 hover:text-emerald-900 transition"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </motion.div>

          {/* Right Form Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-xl p-8 border border-gray-200 hover:shadow-2xl transition-shadow"
          >
            <h2 className="text-2xl font-bold text-center text-emerald-700 mb-6">
              Send us a message
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-emerald-800 transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-emerald-50">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-emerald-700 mb-6">Visit Us</h2>

          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300">
            <iframe
              title="ShareBite Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9418491746223!2d77.11393427570042!3d28.631504884126933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0351baff6933%3A0x48a94e3504dadb9e!2sGuru%20Tegh%20Bahadur%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1761755308688!5m2!1sen!2sin"
              width="100%"
              height="350"
              allowFullScreen=""
              loading="lazy"
              className="border-0 w-full"
            ></iframe>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

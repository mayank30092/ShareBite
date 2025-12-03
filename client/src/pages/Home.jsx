import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-700 to-emerald-600 text-white py-24 px-6 text-center overflow-hidden">
        {/* Soft Background Circles */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-52 h-52 bg-white opacity-10 rounded-full blur-3xl"></div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          ShareBite — Share Food, Spread Smiles 🍽️
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90"
        >
          Join our mission to reduce food waste and hunger. Donors can share
          surplus food, and people in need can claim it instantly.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex justify-center gap-4 flex-wrap"
        >
          <Link
            to="/register"
            className="bg-white text-emerald-700 px-7 py-3 rounded-full font-semibold shadow-md hover:shadow-xl hover:bg-gray-200 transition-all"
          >
            Get Started
          </Link>

          <Link
            to="/about"
            className="border border-white px-7 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition-all"
          >
            Learn More
          </Link>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-white">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-emerald-700"
        >
          How It Works
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              img: "https://cdn-icons-png.flaticon.com/512/1047/1047711.png",
              title: "Donate Food",
              desc: "Restaurants, households, and events can donate extra food safely and easily.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/3565/3565418.png",
              title: "Claim Food",
              desc: "Anyone in need can browse available food nearby and claim it instantly.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/1047/1047710.png",
              title: "Pickup or Delivery",
              desc: "Volunteers or recipients can arrange pickup or delivery for convenience.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="p-6 bg-white border rounded-xl shadow hover:shadow-xl text-center transition-transform hover:-translate-y-2"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-emerald-50 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-emerald-700 mb-10"
        >
          Our Impact So Far
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { number: "10K+", label: "Meals Donated" },
            { number: "3K+", label: "Active Volunteers" },
            { number: "50+", label: "Cities Reached" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-bold text-emerald-700 mb-2">
                {item.number}
              </h3>
              <p className="text-gray-600 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-emerald-700 text-white text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Be a Hero Today 🌍
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-8 text-lg opacity-90"
        >
          Every meal you share brings us closer to a hunger-free world. Register
          today and make an impact.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Link
            to="/register"
            className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 transition-all"
          >
            Join Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

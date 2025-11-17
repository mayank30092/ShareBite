import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-emerald-700 text-white py-20 px-8 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          ShareBite — Share Food, Spread Smiles 🍽️
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join our mission to reduce food waste and hunger. Donors can share
          surplus food, and people in need can claim it easily — together we
          make a difference.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/register"
            className="bg-white text-emerald-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-emerald-700">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png"
              alt="Donate Food"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-center text-emerald-700">
              Donate Food
            </h3>
            <p className="text-sm text-center text-gray-600">
              Restaurants, households, and events can donate extra food through
              our platform safely and easily.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3565/3565418.png"
              alt="Claim Food"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-center text-emerald-700">
              Claim Food
            </h3>
            <p className="text-sm text-center text-gray-600">
              Anyone in need can browse available food nearby and claim it
              instantly through the app.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1047/1047710.png"
              alt="Deliver"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-center text-emerald-700">
              Pickup or Delivery
            </h3>
            <p className="text-sm text-center text-gray-600">
              Volunteers or recipients can arrange pickup or delivery for
              convenience and hygiene.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-emerald-50 text-center">
        <h2 className="text-3xl font-bold text-emerald-700 mb-10">
          Our Impact So Far
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-5xl font-bold text-emerald-700 mb-2">10K+</h3>
            <p className="text-gray-600 font-medium">Meals Donated</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-emerald-700 mb-2">3K+</h3>
            <p className="text-gray-600 font-medium">Active Volunteers</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-emerald-700 mb-2">50+</h3>
            <p className="text-gray-600 font-medium">Cities Reached</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-emerald-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Be a Hero Today 🌍</h2>
        <p className="mb-8 max-w-xl mx-auto text-lg">
          Every meal you share brings us closer to a hunger-free world. Register
          today and make an impact.
        </p>
        <Link
          to="/register"
          className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Join Now
        </Link>
      </section>
    </div>
  );
}

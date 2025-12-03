import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validations
    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!formData.role) {
      setError("❌ Please select a role!");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );

      setSuccess("✔ Registration Successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      setError(error.response?.data?.message || "❌ Error registering user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-center text-emerald-700 mb-6">
          Create Your ShareBite Account 🍽️
        </h2>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg mb-4 text-sm font-semibold text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Success */}
        {success && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-100 border border-green-300 text-green-700 p-3 rounded-lg mb-4 text-sm font-semibold text-center"
          >
            {success}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full h-12 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
              required
            >
              <option value="">-- Select Role --</option>
              <option value="restaurant">Restaurant</option>
              <option value="ngo">NGO</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
              placeholder="Enter your city or area"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-4 top-11 cursor-pointer text-gray-600 text-xl"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-4 top-11 cursor-pointer text-gray-600 text-xl"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 text-white font-semibold py-3 rounded-xl hover:bg-emerald-800 transition-all flex justify-center items-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-emerald-700 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
}

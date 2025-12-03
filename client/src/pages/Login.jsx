import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      login(res.data);

      setSuccess(true);

      setTimeout(() => {
        const role = res.data.role?.toLowerCase();
        if (role === "restaurant") navigate("/restaurant-dashboard");
        else if (role === "ngo") navigate("/ngo-dashboard");
        else if (role === "volunteer") navigate("/volunteer-dashboard");
        else navigate("/");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid Credentials. Please try again."
      );
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
        <h2 className="text-4xl font-extrabold text-center text-emerald-700 mb-6">
          Welcome Back 👋
        </h2>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg mb-4 text-sm font-semibold text-center"
          >
            ❌ {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-100 border border-green-300 text-green-700 p-3 rounded-lg mb-4 text-sm font-semibold text-center"
          >
            ✔ Login Successful!
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
              placeholder="Your password"
              required
            />

            {/* Eye Toggle */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-11 cursor-pointer text-gray-600 text-xl"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-emerald-700" />
              Remember Me
            </label>

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-emerald-700 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 text-white font-semibold py-3 rounded-xl hover:bg-emerald-800 transition-all flex justify-center items-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-emerald-700 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </motion.div>
    </div>
  );
}

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AvailedFoods() {
  const { user } = useContext(AuthContext);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(""); // New state for sorting
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailedFoods = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/claims/my-claims`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setClaims(res.data);
      } catch (err) {
        console.error("Error fetching availed foods:", err);
        setClaims([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchAvailedFoods();
  }, [user]);

  // Sorting logic
  const sortedClaims = [...claims].sort((a, b) => {
    if (sortBy === "expiry") {
      return new Date(a.food.expiryDate) - new Date(b.food.expiryDate);
    } else if (sortBy === "quantity") {
      return b.food.quantity - a.food.quantity;
    } else if (sortBy === "name") {
      return a.food.name.localeCompare(b.food.name);
    }
    return 0; // default, no sorting
  });

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-emerald-100">
      {/* Back Button */}
      <button
        onClick={() => navigate("/ngo-dashboard")}
        className="mb-4 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-green-500 hover:to-emerald-600 transition text-white px-5 py-2 rounded-lg shadow-lg font-semibold"
      >
        ← Back
      </button>

      {/* Title & Sorting */}
      {/* Title & Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-emerald-800 text-center sm:text-left">
          Availed Foods
        </h1>

        <div className="relative">
          <label className="sr-only">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold py-2 px-4 pr-10 rounded-xl shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="">-- Default --</option>
            <option value="quantity">Quantity (Highest)</option>
            <option value="name">Food Name (A-Z)</option>
            <option value="expiry">Expiry Date (Soonest)</option>
          </select>

          {/* Custom arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-white/50 backdrop-blur-sm animate-pulse rounded-2xl shadow-md"
            ></div>
          ))}
        </div>
      )}

      {/* No Data */}
      {!loading && claims.length === 0 && (
        <p className="text-center text-gray-600 text-lg">
          No foods availed yet.
        </p>
      )}

      {/* Cards Grid */}
      {!loading && claims.length > 0 && (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedClaims.map((claim) => (
            <div
              key={claim._id}
              onClick={() => navigate(`/availed-foods/${claim._id}`)}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-emerald-100 cursor-pointer transform transition-all hover:-translate-y-2 hover:shadow-2xl hover:bg-white/90"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-emerald-700">
                  {claim.food.name}
                </h3>

                <span className="text-xs px-3 py-1 rounded-full font-semibold bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow">
                  Collected
                </span>
              </div>

              <p className="text-gray-700 mb-2">
                <strong>Quantity:</strong> {claim.food.quantity}
              </p>

              <p className="text-gray-700 mb-2">
                <strong>Type:</strong> {claim.food.type}
              </p>

              {claim.food.expiryDate && (
                <p className="text-gray-600 text-sm mt-3">
                  <strong>Expires:</strong>{" "}
                  {new Date(claim.food.expiryDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

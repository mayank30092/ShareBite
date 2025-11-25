import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AvailedFoods() {
  const { user } = useContext(AuthContext);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailedFoods = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://sharebite-d393.onrender.com/api/claims/my-claims",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
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

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-emerald-100">
      {/* Back Button */}
      <button
        onClick={() => navigate("/ngo-dashboard")}
        className="mb-8 bg-emerald-700 hover:bg-emerald-800 transition text-white px-5 py-2 rounded-lg shadow-lg"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-4xl font-bold text-emerald-800 text-center mb-10">
        Availed Foods
      </h1>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-44 bg-white/60 backdrop-blur-sm animate-pulse rounded-2xl shadow-sm"
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {claims.map((claim) => (
            <div
              key={claim._id}
              onClick={() => navigate(`/availed-foods/${claim._id}`)}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-emerald-100 cursor-pointer transform transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-emerald-700">
                  {claim.food.name}
                </h3>

                <span className="text-xs px-3 py-1 rounded-full font-semibold bg-emerald-100 text-emerald-700 shadow-sm">
                  Collected
                </span>
              </div>

              <p className="text-gray-700 mb-2">
                <strong>Quantity:</strong> {claim.food.quantity}
              </p>

              <p className="text-gray-700 mb-2">
                <strong>Type:</strong> {claim.food.type}
              </p>

              {claim.food.expiry && (
                <p className="text-gray-600 text-sm mt-3">
                  <strong>Expires:</strong>{" "}
                  {new Date(claim.food.expiry).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

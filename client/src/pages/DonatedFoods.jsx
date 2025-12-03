import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function DonatedFoods() {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest"); // default sort
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/foods/my-foods`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setFoods(res.data);
      } catch (err) {
        console.error("Error fetching donated foods", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchFoods();
  }, [user]);

  // Sorting logic
  const sortedFoods = [...foods].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  const getStatusBadge = (status) => {
    if (status === "claimed")
      return "bg-gradient-to-r from-emerald-300 to-emerald-200 text-emerald-800";
    if (status === "expired")
      return "bg-gradient-to-r from-red-300 to-red-200 text-red-800";
    return "bg-gradient-to-r from-yellow-300 to-yellow-200 text-yellow-800"; // pending
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-emerald-100">
      {/* Back Button */}
      <button
        onClick={() => navigate("/restaurant-dashboard")}
        className="mb-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2 font-semibold text-lg"
      >
        <span className="animate-pulse">←</span> Back
      </button>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-emerald-700 mb-4 sm:mb-0">
          🍽️ Your Donated Foods
        </h1>

        {/* Sorting Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="appearance-none bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold py-2 px-4 pr-10 rounded-xl shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : sortedFoods.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You haven't donated any food yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedFoods.map((food) => (
            <div
              key={food._id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-emerald-700">
                  {food.name}
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusBadge(
                    food.status
                  )}`}
                >
                  {food.status.toUpperCase()}
                </span>
              </div>

              {/* Details */}
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Quantity:</span> {food.quantity}
              </p>

              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Type:</span> {food.type}
              </p>

              {food.expiryDate && (
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Expiry:</span>{" "}
                  {new Date(food.expiryDate).toLocaleDateString()}
                </p>
              )}

              {food.description && (
                <p className="text-gray-600 text-sm mt-2">{food.description}</p>
              )}

              {/* Availed By Section */}
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                {food.claimedBy ? (
                  <p className="text-emerald-700 font-semibold flex items-center gap-2">
                    <span>🤝</span> Availed By:{" "}
                    <span className="font-bold">{food.claimedBy.name}</span>
                  </p>
                ) : (
                  <p className="text-gray-500 italic">Not availed yet</p>
                )}

                {/* Feedback Section */}
                {food.feedback && (
                  <div className="mt-4 p-4 bg-white rounded-2xl shadow border border-emerald-100 animate-fadeIn">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-lg ${
                              star <= food.rating
                                ? "text-amber-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        Submitted by NGO
                      </span>
                    </div>
                    <p className="text-gray-700">{food.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

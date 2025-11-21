import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function DonatedFoods() {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:4000/api/foods/my-foods",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
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

  const getStatusBadge = (status) => {
    if (status === "claimed")
      return "bg-emerald-100 text-emerald-700 border-emerald-300";
    if (status === "expired") return "bg-red-100 text-red-700 border-red-300";
    return "bg-yellow-100 text-yellow-700 border-yellow-300"; // pending
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-emerald-100">
      <h1 className="text-4xl font-bold text-emerald-700 mb-8 text-center">
        🍽️ Your Donated Foods
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : foods.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You haven't donated any food yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-all hover:shadow-xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-emerald-700">
                  {food.name}
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full border font-semibold ${getStatusBadge(
                    food.status
                  )}`}
                >
                  {food.status}
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
                  {new Date(food.expiryDate).toLocaleString()}
                </p>
              )}

              {food.description && (
                <p className="text-gray-600 text-sm mt-2">{food.description}</p>
              )}

              {/* ⭐ Availed By Section */}
              <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                {food.claimedBy ? (
                  <p className="text-emerald-700 font-semibold flex items-center gap-2">
                    <span>🤝</span> Availed By: NGO
                    <span className="font-bold">{food.claimedBy.name}</span>
                  </p>
                ) : (
                  <p className="text-gray-500 italic">Not availed yet</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

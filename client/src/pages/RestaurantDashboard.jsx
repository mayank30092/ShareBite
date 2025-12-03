import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function RestaurantDashboard() {
  const { user } = useContext(AuthContext);
  const [activeFoods, setActiveFoods] = useState([]);
  const [collectedFoods, setCollectedFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/foods`);
      const allFoods = Array.isArray(res.data)
        ? res.data
        : res.data.foods || [];

      const userId = user._id || user.id;

      const userFoods = allFoods.filter((food) => {
        const createdById = food.createdBy?._id || food.createdBy;
        return createdById?.toString() === userId?.toString();
      });

      setActiveFoods(userFoods.filter((f) => !f.claimedBy));
      setCollectedFoods(userFoods.filter((f) => f.claimedBy));
    } catch (err) {
      console.log("Error fetching foods:", err);
      setActiveFoods([]);
      setCollectedFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && (user._id || user.id)) fetchFoods();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donation?"))
      return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/foods/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setActiveFoods(activeFoods.filter((food) => food._id !== id));
      alert("Donation deleted successfully!");
    } catch (err) {
      console.error("Error deleting donation:", err);
      alert("Failed to delete donation");
    }
  };

  const handleEdit = (id) => navigate(`/add-food/${id}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-8 drop-shadow-md text-center md:text-left">
        🍱 Restaurant Dashboard
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={() => navigate("/add-food")}
          className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:from-emerald-500 hover:to-emerald-600 transition-all"
        >
          ➕ Add New Food
        </button>

        <button
          onClick={() => navigate("/donated-foods")}
          className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:from-emerald-500 hover:to-emerald-600 transition-all"
        >
          📦 View Donated Foods
        </button>
      </div>

      {/* Active Food Donations */}
      <section className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-emerald-800 mb-6">
          🟢 Active Food Donations
        </h2>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-60 bg-white/50 backdrop-blur-sm animate-pulse rounded-2xl shadow-md"
              ></div>
            ))}
          </div>
        ) : activeFoods.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No active food donations.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeFoods.map((food) => (
              <div
                key={food._id}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-5 border border-emerald-100 hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-emerald-700 mb-2">
                    {food.name}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <strong>Quantity:</strong> {food.quantity}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Type:</strong> {food.type}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Expiry:</strong>{" "}
                    {new Date(food.expiryDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mt-2">{food.description}</p>
                </div>

                {/* Edit / Delete Buttons */}
                <div className="flex mt-4 gap-3">
                  <button
                    onClick={() => handleEdit(food._id)}
                    className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 shadow-md transition-all"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 shadow-md transition-all"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

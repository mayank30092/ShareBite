import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function RestaurantDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeFoods, setActiveFoods] = useState([]);
  const [collectedFoods, setCollectedFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all foods
  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://sharebite-d393.onrender.com/api/foods`
      );
      const allFoods = Array.isArray(res.data)
        ? res.data
        : res.data.foods || [];

      const userId = user._id || user.id;

      // Foods created by this user only
      const userFoods = allFoods.filter((food) => {
        const createdById = food.createdBy?._id || food.createdBy;
        return createdById?.toString() === userId?.toString();
      });

      // Separate by claimed or not
      setActiveFoods(userFoods.filter((f) => !f.claimedBy)); // Not yet collected
      setCollectedFoods(userFoods.filter((f) => f.claimedBy)); // Collected by NGO
    } catch (err) {
      console.log("Error fetching foods:", err);
      setActiveFoods([]);
      setCollectedFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && (user._id || user.id)) {
      fetchFoods();
    }
  }, [user]);

  // Delete food donation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donation?"))
      return;

    try {
      await axios.delete(
        `https://sharebite-d393.onrender.com/api/foods/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

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
      <h1 className="text-4xl font-bold text-emerald-700 mb-8 drop-shadow-sm">
        🍱 Restaurant Dashboard
      </h1>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate("/add-food")}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 shadow-md"
        >
          ➕ Add New Food
        </button>

        <button
          onClick={() => navigate("/donated-foods")}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 shadow-md"
        >
          📦 View Donated Foods
        </button>
      </div>

      {/* ================= ACTIVE FOODS ================= */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">
          🟢 Active Food Donations
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : activeFoods.length === 0 ? (
          <p className="text-center text-gray-500">No active food donations.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeFoods.map((food) => (
              <div
                key={food._id}
                className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
              >
                <div>
                  <h3 className="text-xl font-bold text-emerald-700 mb-2">
                    {food.name}
                  </h3>

                  <p className="text-gray-600 mb-1">
                    <strong>Quantity:</strong> {food.quantity}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Type:</strong> {food.type}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Expiry:</strong>{" "}
                    {new Date(food.expiryDate).toLocaleDateString()}
                  </p>

                  <p className="text-gray-600 mb-3">{food.description}</p>
                </div>

                {/* Edit / Delete */}
                <div className="flex mt-4 justify-between">
                  <button
                    onClick={() => handleEdit(food._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all shadow"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

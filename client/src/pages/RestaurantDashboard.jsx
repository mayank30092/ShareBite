import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function RestaurantDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch foods created by this restaurant
  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4000/api/foods`);
      const allFoods = Array.isArray(res.data)
        ? res.data
        : res.data.foods || [];

      const restaurantFoods = allFoods.filter((food) => {
        const userId = user._id || user.id; // pick whichever exists
        const createdById = food.createdBy?._id || food.createdBy;
        return createdById?.toString() === userId?.toString();
      });

      setFoods(restaurantFoods);
    } catch (err) {
      console.log("Error fetching foods:", err);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && (user._id || user.id)) {
      fetchFoods();
    }
  }, [user]);

  // 🗑️ Delete food donation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donation?"))
      return;

    try {
      await axios.delete(`http://localhost:4000/api/foods/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setFoods(foods.filter((food) => food._id !== id));
      alert("Donation deleted successfully!");
    } catch (err) {
      console.error("Error deleting donation:", err);
      alert("Failed to delete donation");
    }
  };

  // ✏️ Edit food donation
  const handleEdit = (id) => {
    navigate(`/add-food/${id}`);
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <h1 className="text-4xl font-bold text-emerald-700 mb-8">
        🍱 Restaurant Dashboard
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate("/add-food")}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          Add New Food
        </button>

        <button
          onClick={() => navigate("/donated-foods")}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          View Donated Foods
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
          Your Donations
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : foods.length === 0 ? (
          <p className="text-center text-gray-600">No food donations yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 mb-2">
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
                  <p className="text-gray-600 mb-2">{food.description}</p>

                  {food.claimedBy ? (
                    <p className="text-sm text-emerald-700 font-semibold">
                      ✅ Claimed by: {food.claimedBy.name}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Not claimed yet
                    </p>
                  )}
                </div>

                {/* Buttons only visible when not claimed */}
                {!food.claimedBy && (
                  <div className="flex mt-4">
                    <button
                      onClick={() => handleEdit(food._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-red-600 text-white px-4 mx-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

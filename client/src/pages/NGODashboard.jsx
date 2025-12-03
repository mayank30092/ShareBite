import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function NGODashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/foods`);

      const availableFoods = res.data.filter(
        (food) =>
          food.status === "available" && new Date(food.expiryDate) > new Date()
      );

      setFoods(availableFoods);
    } catch (err) {
      console.error("Error fetching foods:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleClaim = async (foodId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/claims`,
        { foodId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      navigate(`/food-details/${foodId}`);
    } catch (err) {
      alert("Failed to claim food");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 tracking-tight">
          🌿 NGO Dashboard
        </h1>

        <button
          onClick={() => navigate("/availed-foods")}
          className="bg-gradient-to-r from-emerald-600 to-green-500 text-white px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
        >
          🛒 Availed Foods
        </button>
      </div>

      {/* Available Foods */}
      <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-6">
        Available Foods
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : foods.length === 0 ? (
        <p className="text-center text-gray-600">No food donations yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {foods.map((food) => (
            <div
              key={food._id}
              onClick={() => setSelectedFood(food)}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all border border-green-100 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-green-800">
                    {food.name}
                  </h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {food.type}
                  </span>
                </div>

                <p className="text-gray-700">
                  <strong>Qty:</strong> {food.quantity}
                </p>
                <p className="text-gray-700">
                  <strong>Expiry:</strong>{" "}
                  {new Date(food.expiryDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mt-2 flex items-center">
                  📍 <span className="ml-1">{food.pickupLocation}</span>
                </p>
              </div>

              <button
                className="mt-4 w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2 rounded-lg hover:from-emerald-500 hover:to-green-600 transition shadow font-semibold"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/food-details/${food._id}`);
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedFood && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xl w-[90%] relative transform scale-95 animate-scaleUp transition-all duration-300">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setSelectedFood(null)}
            >
              ✖
            </button>

            <h2 className="text-3xl font-bold text-green-800 mb-3">
              {selectedFood.name}
            </h2>
            <p className="text-gray-700">{selectedFood.description}</p>
            <p className="text-gray-700 mt-2">
              <strong>Quantity:</strong> {selectedFood.quantity}
            </p>
            <p className="text-gray-700">
              <strong>Type:</strong> {selectedFood.type}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Expiry:</strong>{" "}
              {new Date(selectedFood.expiryDate).toLocaleDateString()}
            </p>

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 mb-4">
              <MapContainer
                center={[
                  selectedFood.latitude || 0,
                  selectedFood.longitude || 0,
                ]}
                zoom={14}
                style={{ height: "250px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[
                    selectedFood.latitude || 0,
                    selectedFood.longitude || 0,
                  ]}
                >
                  <Popup>{selectedFood.pickupLocation}</Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleClaim(selectedFood._id)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-xl shadow hover:from-emerald-500 hover:to-green-600 transition font-semibold"
              >
                ✅ Avail Food
              </button>

              <button
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition"
                onClick={() => setSelectedFood(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

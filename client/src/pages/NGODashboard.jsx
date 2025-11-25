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
      const res = await axios.get(
        "https://sharebite-d393.onrender.com/api/foods"
      );

      const availableFoods = res.data.filter((food) => {
        return (
          food.status === "available" && new Date(food.expiryDate) > new Date() // remove expired items
        );
      });

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

  const isExpired = (expiryDate) => new Date(expiryDate) < new Date();

  const handleClaim = async (foodId) => {
    try {
      await axios.post(
        "https://sharebite-d393.onrender.com/api/claims",
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-green-800 tracking-tight">
          🌿 NGO Dashboard
        </h1>

        <button
          onClick={() => navigate("/availed-foods")}
          className="bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-emerald-800 shadow-md hover:shadow-lg transition-all"
        >
          🛒 Availed Foods
        </button>
      </div>

      <h2 className="text-2xl font-bold text-green-900 mb-4">
        Available Foods
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : foods.length === 0 ? (
        <p className="text-center text-gray-600">No food donations yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <div
              key={food._id}
              onClick={() => setSelectedFood(food)}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-green-100 cursor-pointer"
            >
              <div className="flex justify-between">
                <h3 className="text-xl font-bold text-green-800">
                  {food.name}
                </h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {food.type}
                </span>
              </div>

              <p className="text-gray-700 mt-2">
                <strong>Qty:</strong> {food.quantity}
              </p>

              <p className="text-gray-700">
                <strong>Expiry:</strong>{" "}
                {new Date(food.expiryDate).toLocaleDateString()}
              </p>

              <div className="mt-3 text-sm text-gray-600 flex items-center">
                📍 <span className="ml-1">{food.pickupLocation}</span>
              </div>

              <button
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition shadow"
                onClick={() => navigate(`/availed-foods/${claim._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Modal */}
      {selectedFood && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xl w-[90%] relative animate-fadeIn scale-95 animate-scaleUp">
            {/* Close Button */}
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
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Restaurant Location
            </h3>

            <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
              <MapContainer
                center={[selectedFood.latitude, selectedFood.longitude]}
                zoom={14}
                style={{ height: "250px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[selectedFood.latitude, selectedFood.longitude]}
                >
                  <Popup>{selectedFood.pickupLocation}</Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleClaim(selectedFood._id)}
                className="w-full bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition"
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

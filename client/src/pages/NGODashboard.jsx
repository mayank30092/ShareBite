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
      const res = await axios.get("http://localhost:4000/api/foods");
      const availableFoods = res.data.filter(
        (food) => food.status === "available"
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

  const isExpired = (expiryDate) => new Date(expiryDate) < new Date();

  const handleClaim = async (foodId) => {
    try {
      await axios.post(
        "http://localhost:4000/api/claims",
        { foodId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      navigate(`/food-details/${foodId}`); // ⬅️ redirect to details page
    } catch (err) {
      alert("Failed to claim food");
    }
  };

  const handleGiveUp = async (claimId) => {
    try {
      await axios.post(
        `http://localhost:4000/api/claims/give-up/${claimId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("You gave up this food. It's now available for others.");
      fetchFoods();
      setSelectedFood(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to give up food");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-green-700 mb-8">NGO Dashboard</h1>
      <div className="mb-6">
        <button
          onClick={() => navigate("/availed-foods")}
          className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-all"
        >
          🛒 View Availed Foods
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : foods.length === 0 ? (
        <p className="text-center text-gray-600">
          No available food donations.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white p-5 rounded-xl shadow-md border cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedFood(food)}
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">
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
              <p className="text-gray-600 mb-1">
                <strong>Pickup Location:</strong>
                {food.pickupLocation}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-3xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 text-xl"
              onClick={() => setSelectedFood(null)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-green-700 mb-4">
              {selectedFood.name}
            </h2>
            <p className="text-gray-700 mb-2">{selectedFood.description}</p>
            <p className="text-gray-600 mb-2">
              <strong>Quantity:</strong> {selectedFood.quantity}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Type:</strong> {selectedFood.type}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Expiry:</strong>{" "}
              {new Date(selectedFood.expiryDate).toLocaleDateString()}
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">
              Restaurant Location
            </h3>
            {selectedFood.createdBy?.location ? (
              <MapContainer
                center={[
                  selectedFood.createdBy.location.lat,
                  selectedFood.createdBy.location.lng,
                ]}
                zoom={13}
                style={{ height: "200px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[
                    selectedFood.createdBy.location.lat,
                    selectedFood.createdBy.location.lng,
                  ]}
                >
                  <Popup>{selectedFood.createdBy.name}</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p className="text-gray-500">No location provided</p>
            )}

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => handleClaim(selectedFood._id)}
                disabled={
                  isExpired(selectedFood.expiryDate) ||
                  selectedFood.status !== "available"
                }
                className={`px-6 py-2 rounded-lg text-white font-semibold transition-all ${
                  isExpired(selectedFood.expiryDate) ||
                  selectedFood.status !== "available"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                ✅ Avail
              </button>

              {selectedFood.claimedBy?._id === user.id && (
                <button
                  onClick={() => handleGiveUp(selectedFood._id)}
                  className="px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold"
                >
                  🗑 Give Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

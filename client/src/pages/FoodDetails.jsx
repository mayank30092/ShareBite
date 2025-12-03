import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch food details
  const fetchFood = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/foods/${id}`
      );
      setFood(res.data);
    } catch (err) {
      console.error("Error fetching food:", err);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  // Handle availing food
  const handleAvailFood = async () => {
    if (!user) return alert("Please login to avail food.");

    try {
      setLoading(true);
      // Correct API: POST /api/claims with { foodId }
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/claims`,
        { foodId: id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      alert("You have successfully availed this food!");
      // Refresh food details after claiming
      await fetchFood();
      // Optional: redirect to availed foods list
      // navigate("/availed-foods");
    } catch (err) {
      console.error("Error availing food:", err);
      alert(err.response?.data?.message || "Could not avail food. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!food)
    return (
      <p className="text-center mt-20 text-gray-600 text-lg">Loading...</p>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate("/ngo-dashboard")}
        className="mb-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-6 py-2 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2 font-semibold"
      >
        ← Back
      </button>

      {/* Food Card */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100 animate-fadeIn">
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">
          {food.name}
        </h1>

        <p className="text-gray-700 mb-2">
          <strong>Description:</strong> {food.description || "No description"}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Quantity:</strong> {food.quantity}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Type:</strong> {food.type}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Expiry:</strong>{" "}
          {new Date(food.expiryDate).toLocaleDateString()}
        </p>

        {/* Pickup Location */}
        <h2 className="text-2xl font-semibold text-emerald-700 mb-3">
          📍 Pickup Location
        </h2>

        {food.pickupLocation ? (
          <>
            <p className="text-gray-700 mb-4">{food.pickupLocation}</p>

            {food.latitude && food.longitude ? (
              <div className="w-full h-80 rounded-2xl overflow-hidden shadow-md mb-4 relative">
                <MapContainer
                  center={[food.latitude, food.longitude]}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[food.latitude, food.longitude]}>
                    <Popup>Pickup Location: {food.pickupLocation}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            ) : (
              <p className="text-gray-500 mb-4">
                No map available for this location.
              </p>
            )}

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${food.latitude},${food.longitude}`}
              target="_blank"
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-2xl shadow hover:shadow-lg transition-all font-semibold mb-4"
            >
              🧭 Open in Google Maps
            </a>

            {/* Avail Food Button */}
            {!food.claimedBy ? (
              <button
                onClick={handleAvailFood}
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all font-semibold"
              >
                {loading ? "Processing..." : "🤝 Avail Food"}
              </button>
            ) : (
              <p className="mt-4 text-gray-600">
                This food has been availed by:{" "}
                <span className="font-semibold">{food.claimedBy.name}</span>
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-500">No pickup location available.</p>
        )}
      </div>
    </div>
  );
}

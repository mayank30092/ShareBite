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

  useEffect(() => {
    const fetchFood = async () => {
      const res = await axios.get(`http://localhost:4000/api/foods/${id}`);
      setFood(res.data);
    };
    fetchFood();
  }, [id]);

  if (!food) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <button
        onClick={() => navigate("/ngo-dashboard")}
        className="mb-4 bg-emerald-700 rounded-lg text-white p-2 w-24"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-green-700 mb-4">{food.name}</h1>

      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {food.description}
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

      <h2 className="text-xl font-bold mt-4 mb-2">Pickup Location</h2>

      {food.pickupLocation ? (
        <>
          <p className="text-gray-700 mb-2">📍 {food.pickupLocation}</p>

          {food.latitude && food.longitude ? (
            <div
              style={{
                height: "400px",
                width: "90%",
                margin: "0 auto",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <MapContainer
                center={[food.latitude, food.longitude]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[food.latitude, food.longitude]}>
                  <Popup>Pickup Location: {food.pickupLocation}</Popup>
                </Marker>
              </MapContainer>
            </div>
          ) : (
            <p className="text-gray-500 mt-2">
              No map available for this location.
            </p>
          )}

          <div className="mt-4">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${food.latitude},${food.longitude}`}
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              🧭 Open in Google Maps
            </a>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No pickup location available.</p>
      )}
    </div>
  );
}

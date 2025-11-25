import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getCoordinates } from "../utils/locationMap";

export default function AvailedFoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // compute coords only when claim exists
  const coords = claim?.food?.createdBy?.location
    ? getCoordinates(claim.food.createdBy.location)
    : null;

  useEffect(() => {
    if (!user?.token) return navigate("/login");

    const fetchClaimDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `https://sharebite-d393.onrender.com/api/claims/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        setClaim(res.data);
      } catch (err) {
        console.error("Error fetching claim details:", err);
        setError("Failed to load details");
      } finally {
        setLoading(false);
      }
    };

    fetchClaimDetails();
  }, [id, user, navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!claim?.food) return <p className="text-center mt-10">Food not found.</p>;

  const food = claim.food;
  const donor = food.createdBy;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-emerald-100">
      {/* Back Button */}
      <button
        onClick={() => navigate("/availed-foods")}
        className="mb-6 bg-emerald-700 hover:bg-emerald-800 transition text-white px-6 py-2 rounded-lg shadow-lg"
      >
        ← Back
      </button>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-emerald-800 mb-8 text-center">
        Food Details
      </h1>

      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-emerald-100">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-emerald-700 mb-4">
          {food.name}
        </h2>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-3 text-gray-700 mb-6">
          <p>
            <strong className="text-emerald-800">Quantity:</strong>{" "}
            {food.quantity}
          </p>
          <p>
            <strong className="text-emerald-800">Type:</strong> {food.type}
          </p>
          <p>
            <strong className="text-emerald-800">Claimed On:</strong>{" "}
            {new Date(claim.createdAt).toLocaleString()}
          </p>

          <hr className="my-3 border-emerald-200" />

          <p>
            <strong className="text-emerald-800">Donated By:</strong>{" "}
            {donor?.name || "Unknown"}
          </p>
          <p>
            <strong className="text-emerald-800">Address:</strong>{" "}
            {donor?.location || "Not provided"}
          </p>
        </div>

        {/* Description */}
        {food.description && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-emerald-700 mb-1">
              Description
            </h3>
            <p className="text-gray-700">{food.description}</p>
          </div>
        )}

        {/* Map Section */}
        {coords && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-emerald-700 mb-3">
              Pickup Location
            </h3>

            <div className="overflow-hidden rounded-2xl shadow-xl border border-emerald-200">
              <MapContainer
                center={[coords.lat, coords.lng]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "350px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker position={[coords.lat, coords.lng]}>
                  <Popup>
                    Pickup from: <strong>{donor?.name}</strong>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

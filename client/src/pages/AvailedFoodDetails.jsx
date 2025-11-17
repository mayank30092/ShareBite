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

  // Safe coords: only compute when we have claim and createdBy.location
  const coords = claim?.food?.createdBy?.location
    ? getCoordinates(claim.food.createdBy.location)
    : null;

  useEffect(() => {
    // If user isn't logged in, redirect to login (or home)
    if (!user || !user.token) {
      // you may prefer navigate("/") instead
      navigate("/login");
      return;
    }

    const fetchClaimDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`http://localhost:4000/api/claims/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        // quick sanity log for debugging (remove in production)
        // console.log("Claim response:", res.data);
        setClaim(res.data);
      } catch (err) {
        console.error("Error fetching claim details: ", err);
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to load details"
        );
        setClaim(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClaimDetails();
  }, [id, user, navigate]);

  // render states
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!claim || !claim.food)
    return <p className="text-center">Food details not found.</p>;

  // safe references from claim
  const food = claim.food;
  const donor = food.createdBy; // populated user (name, location, email)

  return (
    <div className="p-6 min-h-screen bg-emerald-50">
      <h1 className="text-3xl font-bold text-emerald-700 mb-4">Food Details</h1>

      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
          {food?.name || "Unnamed food"}
        </h2>

        <p className="mb-2">
          <strong>Quantity:</strong> {food?.quantity ?? "N/A"}
        </p>
        <p className="mb-2">
          <strong>Type:</strong> {food?.type ?? "N/A"}
        </p>
        <p className="mb-2">
          <strong>Claimed On:</strong>{" "}
          {new Date(claim?.createdAt).toLocaleString()}
        </p>

        <p className="mb-2">
          <strong>Donated By:</strong> {donor?.name ?? "Unknown"}
        </p>

        <p className="mb-2">
          <strong>Location:</strong> {donor?.location ?? "Not provided"}
        </p>

        {coords && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Pickup Location</h3>

            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "350px", width: "100%", borderRadius: "12px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={[coords.lat, coords.lng]}>
                <Popup>Pickup from: {donor?.name ?? "Donor"}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

        {food?.description && (
          <p className="mt-2">
            <strong>Description:</strong> {food.description}
          </p>
        )}
      </div>
    </div>
  );
}

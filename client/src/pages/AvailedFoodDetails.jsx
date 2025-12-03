import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getCoordinates } from "../utils/locationMap";
import "leaflet/dist/leaflet.css";

export default function AvailedFoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
          `${import.meta.env.VITE_API_URL}/api/claims/${id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
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

  const handleSubmitFeedback = async () => {
    if (!rating || !feedback) {
      alert("Please provide both rating and feedback");
      return;
    }
    setSubmitting(true);
    try {
      const numericRating = Number(rating);
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/foods/feedback/${claim.food._id}`,
        { rating: numericRating, feedback },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // Update claim state immediately so UI refreshes
      setClaim((prev) => ({
        ...prev,
        food: {
          ...prev.food,
          rating: numericRating,
          feedback,
        },
      }));

      alert("Feedback submitted!");
      setRating(0);
      setFeedback("");
    } catch (err) {
      console.error("Error submitting feedback:", err.response || err);
      alert("Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-600 animate-pulse">
        Loading...
      </p>
    );
  if (error) return <p className="text-center text-red-600 mt-20">{error}</p>;
  if (!claim?.food)
    return <p className="text-center mt-20 text-gray-600">Food not found.</p>;

  const food = claim.food;
  const donor = food.createdBy;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-emerald-100">
      {/* Back Button */}
      <button
        onClick={() => navigate("/availed-foods")}
        className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:from-green-500 hover:to-emerald-600 transition-all"
      >
        ← Back
      </button>

      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-10 text-center">
        Food Details
      </h1>

      {/* Card Container */}
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-emerald-100 space-y-6">
        {/* Food Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-4 text-center md:text-left">
          {food.name}
        </h2>

        {/* Food Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div className="space-y-2">
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
          </div>

          <div className="space-y-2">
            <p>
              <strong className="text-emerald-800">Donated By:</strong>{" "}
              {donor?.name || "Unknown"}
            </p>
            <p>
              <strong className="text-emerald-800">Address:</strong>{" "}
              {donor?.location || "Not provided"}
            </p>
          </div>
        </div>

        {/* Description */}
        {food.description && (
          <div>
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">
              Description
            </h3>
            <p className="text-gray-700">{food.description}</p>
          </div>
        )}

        {/* Map Section */}
        {coords && (
          <div>
            <h3 className="text-2xl font-semibold text-emerald-700 mb-3">
              Pickup Location
            </h3>
            <div className="overflow-hidden rounded-2xl shadow-2xl border border-emerald-200">
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

        {/* Feedback Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">
            ⭐ Feedback & Rating
          </h3>

          {/* NGO Feedback Form */}
          {!food.feedbackList?.some((f) => f.userId === user._id) && (
            <div className="mb-4 p-4 border border-emerald-200 rounded-xl bg-emerald-50">
              <p className="mb-2 font-semibold">Your Rating:</p>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl ${
                      star <= rating ? "text-amber-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Write your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-2 border rounded-lg mb-2"
                rows={3}
              />
              <button
                onClick={handleSubmitFeedback}
                disabled={submitting}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          )}

          {/* Display Submitted Feedback */}
          {food.feedback ? (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-emerald-700 mb-3">
                ✅ Submitted Feedback
              </h4>
              <div className="p-4 bg-white shadow-lg rounded-2xl border border-emerald-100 flex flex-col gap-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-xl ${
                          star <= food.rating
                            ? "text-amber-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    Submitted by You
                  </span>
                </div>
                <p className="text-gray-700">{food.feedback}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No feedback yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

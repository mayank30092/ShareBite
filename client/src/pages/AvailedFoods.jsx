import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AvailedFoods() {
  const { user } = useContext(AuthContext);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailedFoods = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:4000/api/claims/my-claims",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setClaims(res.data);
      } catch (err) {
        console.error("Error fetching availed foods:", err);
        setClaims([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchAvailedFoods();
  }, [user]);

  return (
    <div className="min-h-screen p-6 bg-emerald-50">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6">
        Availed Foods
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : claims.length === 0 ? (
        <p className="text-center text-gray-600">No foods availed yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {claims.map((claim) => (
            <div
              key={claim._id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
              onClick={() => navigate(`/availed-foods/${claim._id}`)}
            >
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                {claim.food.name}
              </h3>
              <p className="text-gray-600 mb-1">
                <strong>Quantity:</strong> {claim.food.quantity}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Type:</strong> {claim.food.type}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

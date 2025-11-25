import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function AddFood() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 foodId if editing

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    type: "veg",
    expiryDate: "",
    pickupLocation: "",
    latitude: "",
    longitude: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ If editing, fetch food details
  useEffect(() => {
    const fetchFood = async () => {
      if (!id) return;
      try {
        const res = await axios.get(
          `https://sharebite-d393.onrender.com/api/foods/${id}`
        );
        const food = res.data;
        setFormData({
          name: food.name,
          description: food.description,
          quantity: food.quantity,
          type: food.type,
          expiryDate: food.expiryDate.split("T")[0],
          pickupLocation: food.pickupLocation || "",
          latitude: food.latitude || "",
          longitude: food.longitude || "",
        });
        setIsEditMode(true);
      } catch (err) {
        console.error("Error fetching food:", err);
      }
    };

    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "pickupLocation" && value.length > 5) {
      handleAddressToCoords(value);
    }
  };

  const handleAddressToCoords = async (address) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      );

      if (res.data.length > 0) {
        setFormData((prev) => ({
          ...prev,
          latitude: res.data[0].lat,
          longitude: res.data[0].lon,
        }));
      }
    } catch (err) {
      console.err("Geocoding failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        // 📝 Update existing food
        await axios.put(
          `https://sharebite-d393.onrender.com/api/foods/${id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        alert("Food updated successfully!");
      } else {
        // ➕ Add new food
        await axios.post(
          "https://sharebite-d393.onrender.com/api/foods",
          formData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        alert("Food added successfully!");
      }

      navigate("/restaurant-dashboard");
    } catch (err) {
      console.error("Error saving food:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-emerald-700 mb-8">
        {isEditMode ? "✏️ Edit Food Donation" : "🍱 Add New Food"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl border border-gray-100 animate-fadeIn"
      >
        {/* Food Name */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            🍽️ Food Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-400 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            📝 Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-400 outline-none"
            required
          ></textarea>
        </div>

        {/* Quantity */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            🔢 Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-400 outline-none"
            required
          />
        </div>

        {/* Type */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            🍛 Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 h-12 focus:ring-2 focus:ring-emerald-400 outline-none"
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>

        {/* Expiry Date */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            ⏳ Expiry Date
          </label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-400 outline-none"
            required
          />
        </div>

        {/* Pickup Location */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            📍 Pickup Location
          </label>
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            placeholder="Enter full pickup address"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-400 outline-none"
            required
          />
          {/* Geo Loading Indicator */}
          {formData.pickupLocation.length > 5 && !formData.latitude && (
            <p className="text-xs text-emerald-600 mt-1 animate-pulse">
              ⏳ Detecting coordinates...
            </p>
          )}
        </div>

        {/* Lat/Lon */}
        {formData.latitude && (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl mb-3 text-sm">
            <p className="text-emerald-700 font-semibold">
              📌 Auto-detected Location:
            </p>
            <p className="text-gray-600 mt-1">
              Lat: {formData.latitude}, Lng: {formData.longitude}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white p-3 rounded-xl font-semibold text-lg hover:bg-emerald-700 shadow-md hover:shadow-xl transition-all duration-200 active:scale-95"
        >
          {isEditMode ? "💾 Update Food" : "➕ Add Food"}
        </button>
      </form>
    </div>
  );
}

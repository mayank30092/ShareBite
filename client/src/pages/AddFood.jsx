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
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ If editing, fetch food details
  useEffect(() => {
    const fetchFood = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`http://localhost:4000/api/foods/${id}`);
        const food = res.data;
        setFormData({
          name: food.name,
          description: food.description,
          quantity: food.quantity,
          type: food.type,
          expiryDate: food.expiryDate.split("T")[0],
          pickupLocation: food.pickupLocation || "",
        });
        setIsEditMode(true);
      } catch (err) {
        console.error("Error fetching food:", err);
      }
    };

    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        // 📝 Update existing food
        await axios.put(`http://localhost:4000/api/foods/${id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        alert("Food updated successfully!");
      } else {
        // ➕ Add new food
        await axios.post("http://localhost:4000/api/foods", formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        alert("Food added successfully!");
      }

      navigate("/restaurant-dashboard");
    } catch (err) {
      console.error("Error saving food:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6">
        {isEditMode ? "✏️ Edit Food Donation" : "🍱 Add New Food"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border border-gray-100"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Food name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg h-12 p-3"
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            placeholder="Enter full pickup address"
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-all w-full"
        >
          {isEditMode ? "💾 Update Food" : "➕ Add Food"}
        </button>
      </form>
    </div>
  );
}

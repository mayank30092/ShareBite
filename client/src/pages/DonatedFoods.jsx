import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function DonatedFoods() {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const res = await axios.get("http://localhost:4000/api/foods/my-foods", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setFoods(res.data);
    };
    fetchFoods();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-emerald-700 mb-4">
        Your Donated Foods
      </h1>

      {foods.map((food) => (
        <div key={food._id} className="p-4 bg-white rounded-lg shadow mb-3">
          <h2 className="text-xl font-semibold">{food.name}</h2>
          <p>Qty: {food.quantity}</p>
          <p>Type: {food.type}</p>
          <p>Status: {food.status}</p>
        </div>
      ))}
    </div>
  );
}

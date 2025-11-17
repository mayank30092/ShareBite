import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import AddFood from "./pages/AddFood";
import NGODashboard from "./pages/NGODashboard";
import AvailedFoods from "./pages/AvailedFoods";
import AvailedFoodDetails from "./pages/AvailedFoodDetails";
import DonatedFoods from "./pages/DonatedFoods";

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-6 bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/add-food" element={<AddFood />} />
          <Route path="/add-food/:id" element={<AddFood />} />
          <Route path="/donated-foods" element={<DonatedFoods />} />
          <Route
            path="/restaurant-dashboard"
            element={<RestaurantDashboard />}
          />

          <Route path="/ngo-dashboard" element={<NGODashboard />} />
          <Route path="/availed-foods" element={<AvailedFoods />} />
          <Route path="/availed-foods/:id" element={<AvailedFoodDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

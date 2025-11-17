import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinkClass = "hover:text-white-200 transition-colors duration-200";
  const activeClass = "text-white font-semibold border-b-2 border-gray-300";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getDashboardRoute = () => {
    if (!user || !user.role) return "/";
    switch (user.role) {
      case "restaurant":
        return "/restaurant-dashboard";
      case "ngo":
        return "/ngo-dashboard";
      case "volunteer":
        return "/volunteer-dashboard";
      default:
        return "/";
    }
  };

  return (
    <nav className="bg-emerald-700 text-white font-bold py-4 px-16 w-screen flex justify-between items-center shadow-md h-20 sticky top-0 z-50">
      <NavLink to="/" className="font-bold text-3xl">
        ShareBite
      </NavLink>

      <div className=" flex space-x-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${activeClass}` : `${navLinkClass}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? `${activeClass}` : `${navLinkClass}`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? `${activeClass}` : `${navLinkClass}`
          }
        >
          Contact
        </NavLink>

        {user && (
          <NavLink
            to={getDashboardRoute()}
            className={({ isActive }) =>
              isActive ? `${activeClass}` : `${navLinkClass}`
            }
          >
            Dashboard
          </NavLink>
        )}

        <div className="space-x-3 ml-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-green-700 font-bold px-4 py-1 rounded-lg hover:bg-green-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login">
                <button className="bg-white text-green-700 font-bold px-4 py-1 rounded-lg hover:bg-green-100 transition">
                  Login
                </button>
              </NavLink>

              <NavLink to="/register">
                <button className="bg-white text-green-700 font-bold px-4 py-1 rounded-lg hover:bg-green-100 transition">
                  Register
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

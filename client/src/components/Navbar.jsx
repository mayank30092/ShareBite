import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // install: npm install lucide-react

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const navLinkClass = "hover:text-gray-200 transition-colors duration-200";
  const activeClass = "text-white font-semibold border-b-2 border-gray-300";

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
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
    <nav className="bg-emerald-700 text-white font-bold py-4 px-6 md:px-16 w-full flex justify-between items-center shadow-md h-20 sticky top-0 z-50">
      {/* Logo */}
      <NavLink to="/" className="font-bold text-3xl">
        ShareBite
      </NavLink>

      {/* Hamburger Icon */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass : navLinkClass)}
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? activeClass : navLinkClass)}
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? activeClass : navLinkClass)}
        >
          Contact
        </NavLink>

        {user && (
          <NavLink
            to={getDashboardRoute()}
            className={({ isActive }) =>
              isActive ? activeClass : navLinkClass
            }
          >
            Dashboard
          </NavLink>
        )}

        <div className="space-x-3">
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

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-20 left-0 w-full bg-emerald-700 text-white flex flex-col space-y-4 py-6 px-8 md:hidden animate-slideDown">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? activeClass : navLinkClass
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? activeClass : navLinkClass
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? activeClass : navLinkClass
            }
          >
            Contact
          </NavLink>

          {user && (
            <NavLink
              to={getDashboardRoute()}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? activeClass : navLinkClass
              }
            >
              Dashboard
            </NavLink>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-green-700 font-bold px-4 py-2 rounded-lg hover:bg-green-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)}>
                <button className="bg-white text-green-700 font-bold w-full py-2 rounded-lg hover:bg-green-100 transition">
                  Login
                </button>
              </NavLink>

              <NavLink to="/register" onClick={() => setOpen(false)}>
                <button className="bg-white text-green-700 font-bold w-full py-2 rounded-lg hover:bg-green-100 transition">
                  Register
                </button>
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

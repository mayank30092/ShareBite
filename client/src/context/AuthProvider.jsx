import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    startAutoLogout(userData.expiresAt);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const startAutoLogout = (expiresAt) => {
    if (!expiresAt) return;

    const expiryTime = expiresAt * 1000;
    const now = Date.now();
    const remaining = expiryTime - now;

    if (remaining <= 0) return logout();

    setTimeout(logout, remaining);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      startAutoLogout(storedUser.expiresAt);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { getLocalWatchlist } from "../utils/watchlist";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState(getLocalWatchlist());

  const token = localStorage.getItem("token");

  // ✅ Decode token on load
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ email: decoded.email });
      } catch (err) {
        setUser(null);
      }
    }
  }, [token]);

  // ✅ Fetch server watchlist
  useEffect(() => {
    const fetchServerWatchlist = async () => {
      if (!token) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/watchlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setWatchlist(res.data.watchlist);
      } catch (err) {
        console.error("❌ Failed to load server watchlist:", err.message);
      }
    };

    fetchServerWatchlist();
  }, [token]);

  // ✅ Login
  const login = (token) => {
    localStorage.setItem("token", token);

    try {
      const decoded = jwtDecode(token);
      setUser({ email: decoded.email });
    } catch (err) {
      setUser(null);
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("watchlist");

    setUser(null);
    setWatchlist(getLocalWatchlist());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        token,
        watchlist,
        setWatchlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

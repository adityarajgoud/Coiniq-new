import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Vault } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // track if the web3 component has initialized internally to kill the placeholder glowing pulse smoothly
  const [isWalletReady, setIsWalletReady] = useState(false);

  useEffect(() => {
    setShowDropdown(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Poll for the AppKit web component custom element to finish rendering its shadow DOM
  useEffect(() => {
    const checkElement = setInterval(() => {
      const el = document.querySelector("appkit-button");
      if (el && el.shadowRoot) {
        setIsWalletReady(true);
        clearInterval(checkElement);
      }
    }, 300);

    return () => clearInterval(checkElement);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { label: "Home", path: "/" },
    { label: "Trending", path: "/trending" },
    { label: "Watchlist", path: "/watchlist" },
    { label: "Compare", path: "/compare" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "News", path: "/news" },
  ];

  return (
    <nav className="glass-nav">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 stylish-logo"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 255, 195, 0.15), rgba(0, 170, 255, 0.15))",
            border: "1px solid rgba(0, 255, 195, 0.3)",
            borderRadius: "12px",
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 15px rgba(0, 255, 195, 0.2)",
          }}
        >
          <Vault size={24} style={{ color: "var(--accent-color)" }} />
        </div>

        <span
          className="text-gold"
          style={{
            fontSize: "1.5rem",
            fontWeight: "800",
            letterSpacing: "1.5px",
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          COIN
          <span style={{ color: "var(--accent-color)", fontWeight: "400" }}>
            IQ
          </span>
        </span>
      </Link>

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Nav Links */}
      <div className={`nav-links-container ${menuOpen ? "open" : ""}`}>
        {links.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className={`nav-link ${
              location.pathname === path ? "active-link" : ""
            }`}
          >
            {label}
          </Link>
        ))}

        {/* Wallet Button Container - Masking the 10s load latency */}
        <div
          className="wallet-btn-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            minWidth: "135px",
            minHeight: "40px",
          }}
        >
          {/* Glowing Premium Loader Shell Mask */}
          {!isWalletReady && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, #1e1e1e 25%, #2d2d2d 50%, #1e1e1e 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite linear",
                borderRadius: "10px",
                border: "1px solid rgba(0, 255, 195, 0.2)",
                boxShadow: "0 0 8px rgba(0, 255, 195, 0.1)",
                zIndex: 5,
                pointerEvents: "none",
              }}
            />
          )}

          <appkit-button
            style={{
              opacity: isWalletReady ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        </div>

        {/* Auth Section */}
        {!user ? (
          <Link to="/login" className="nav-link login-link">
            Login / Signup
          </Link>
        ) : (
          <div className="profile-dropdown" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="nav-link user-btn"
            >
              {user?.email ? user.email.split("@")[0] : "User"} ⏷
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  👤 Profile
                </Link>

                <button onClick={handleLogout} className="dropdown-item logout">
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}

        <Link
          to="/about"
          className={`nav-link ${
            location.pathname === "/about" ? "active-link" : ""
          }`}
        >
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

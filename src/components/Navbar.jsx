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

  // close menu on route change
  useEffect(() => {
    setShowDropdown(false);
    setMenuOpen(false);
  }, [location.pathname]);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        {/* Modern Tech Glowing Icon Wrapper */}
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

        {/* High-End Typographic Branding */}
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

        {/* Wallet Button (AppKit) */}
        <div
          className="wallet-btn-wrapper"
          style={{ display: "flex", alignItems: "center" }}
        >
          <appkit-button />
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

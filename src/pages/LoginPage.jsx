// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          email,
          password,
        },
      );

      const { token } = res.data;

      login(token);

      showToast("Login successful", "success");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      showToast("Invalid email or password", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectToSignup = () => {
    setRedirecting(true);

    setTimeout(() => {
      navigate("/signup");
    }, 800);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1f1b10 0%, #0d0d0d 45%, #000000 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "rgba(255, 183, 0, 0.12)",
          filter: "blur(120px)",
          borderRadius: "50%",
          top: "-150px",
          right: "-100px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "rgba(255, 215, 0, 0.08)",
          filter: "blur(100px)",
          borderRadius: "50%",
          bottom: "-120px",
          left: "-100px",
        }}
      />

      {/* Login Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "rgba(17, 17, 17, 0.92)",
          border: "1px solid rgba(255, 215, 0, 0.2)",
          backdropFilter: "blur(18px)",
          borderRadius: "24px",
          padding: "40px 35px",
          boxShadow: "0 0 50px rgba(255, 183, 0, 0.12)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              color: "#FFD700",
              fontSize: "42px",
              fontWeight: "800",
              margin: 0,
              letterSpacing: "1px",
            }}
          >
            CoinIQ
          </h1>

          <p style={{ color: "#999", marginTop: "10px", fontSize: "15px" }}>
            Secure access to your crypto dashboard
          </p>
        </div>

        {/* Email */}
        <div style={{ marginBottom: "22px" }}>
          <label
            style={{
              color: "#d4af37",
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              fontWeight: "500",
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "#161616",
              color: "#fff",
              outline: "none",
              fontSize: "15px",
              transition: "0.3s",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "18px" }}>
          <label
            style={{
              color: "#d4af37",
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
              fontWeight: "500",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "#161616",
              color: "#fff",
              outline: "none",
              fontSize: "15px",
              transition: "0.3s",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Forgot Password */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "28px",
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              color: "#FFD700",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "14px",
            border: "none",
            background: "linear-gradient(135deg, #FFD700 0%, #C89B3C 100%)",
            color: "#111",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "0.3s",
            boxShadow: "0 10px 25px rgba(255, 215, 0, 0.25)",
          }}
        >
          {isLoading ? "Signing In..." : "Login"}
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "30px 0",
            gap: "10px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <span style={{ color: "#777", fontSize: "13px" }}>OR</span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Signup */}
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#999", marginBottom: "14px", fontSize: "14px" }}>
            New to CoinIQ?
          </p>

          <button
            onClick={handleRedirectToSignup}
            disabled={redirecting}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              background: "transparent",
              border: "1px solid rgba(255,215,0,0.35)",
              color: "#FFD700",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {redirecting ? "Redirecting..." : "Create Account"}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: "25px",
            right: "25px",
            padding: "14px 22px",
            borderRadius: "12px",
            background:
              toast.type === "error"
                ? "rgba(255, 59, 48, 0.95)"
                : "rgba(34, 197, 94, 0.95)",
            color: "#fff",
            fontWeight: "600",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            zIndex: 999,
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;

// src/pages/SignupPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
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
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  };

  const handleSignup = async () => {
    if (!email || !password) {
      showToast("Please fill all fields", "error");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        {
          email,
          password,
        },
      );

      const { token } = res.data;

      login(token);

      showToast("Account created successfully", "success");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      showToast("Signup failed. Try another email", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectToLogin = () => {
    setRedirecting(true);

    setTimeout(() => {
      navigate("/login");
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
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* UI unchanged */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "rgba(255, 215, 0, 0.10)",
          borderRadius: "50%",
          filter: "blur(120px)",
          top: "-150px",
          right: "-100px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "rgba(255, 183, 0, 0.08)",
          borderRadius: "50%",
          filter: "blur(120px)",
          bottom: "-120px",
          left: "-100px",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "rgba(17,17,17,0.92)",
          border: "1px solid rgba(255,215,0,0.18)",
          borderRadius: "26px",
          padding: "42px 35px",
          backdropFilter: "blur(18px)",
          boxShadow: "0 0 50px rgba(255,215,0,0.12)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <h1 style={{ color: "#FFD700", fontSize: "42px", fontWeight: "800" }}>
            CoinIQ
          </h1>
          <p style={{ color: "#9f9f9f", marginTop: "10px", fontSize: "15px" }}>
            Create your secure crypto account
          </p>
        </div>

        <div style={{ marginBottom: "22px" }}>
          <label style={{ color: "#d4af37", fontSize: "14px" }}>
            Email Address
          </label>
          <input
            type="email"
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
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ color: "#d4af37", fontSize: "14px" }}>
            Create Password
          </label>
          <input
            type="password"
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
            }}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "14px",
            border: "none",
            background: "linear-gradient(135deg, #FFD700 0%, #C89B3C 100%)",
            color: "#111",
            fontWeight: "700",
          }}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <p style={{ color: "#9a9a9a" }}>Already have an account?</p>
          <button
            onClick={handleRedirectToLogin}
            disabled={redirecting}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              border: "1px solid rgba(255,215,0,0.35)",
              background: "transparent",
              color: "#FFD700",
            }}
          >
            {redirecting ? "Redirecting..." : "Go to Login"}
          </button>
        </div>
      </div>

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
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default SignupPage;

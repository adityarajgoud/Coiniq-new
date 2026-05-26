// src/components/GlobalLoader.jsx
import React from "react";

function GlobalLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(circle at top, #1f1b10 0%, #0b0b0b 45%, #000 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "rgba(255, 215, 0, 0.10)",
          filter: "blur(120px)",
          animation: "pulseGlow 3s ease-in-out infinite",
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "22px",
        }}
      >
        {/* Animated Coin Logo */}
        <div
          style={{
            width: "95px",
            height: "95px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #FFD700 0%, #C89B3C 50%, #FFF1A8 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 35px rgba(255, 215, 0, 0.45)",
            animation: "coinSpin 2.8s linear infinite",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#111",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid rgba(255,215,0,0.3)",
            }}
          >
            <span
              style={{
                color: "#FFD700",
                fontSize: "34px",
                fontWeight: "800",
              }}
            >
              ₿
            </span>
          </div>
        </div>

        {/* Text */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "52px",
              fontWeight: "900",
              letterSpacing: "4px",
              background:
                "linear-gradient(135deg, #FFD700 0%, #FFF1A8 50%, #C89B3C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(255,215,0,0.35)",
            }}
          >
            COINIQ
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#9c9c9c",
              fontSize: "14px",
              letterSpacing: "2px",
            }}
          >
            POWERING THE FUTURE OF CRYPTO
          </p>
        </div>

        {/* Loading Bar */}
        <div
          style={{
            width: "220px",
            height: "4px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "20px",
            overflow: "hidden",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: "40%",
              height: "100%",
              borderRadius: "20px",
              background: "linear-gradient(90deg, #FFD700, #FFF1A8, #FFD700)",
              animation: "loadingBar 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes coinSpin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes loadingBar {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(320%); }
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

export default GlobalLoader;

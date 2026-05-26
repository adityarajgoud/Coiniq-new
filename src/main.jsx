// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ Import the naming hook explicitly
import { initAppKit } from "./context/Web3Config";

// ✅ Execute the initial parameters loop immediately before React starts
initAppKit();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

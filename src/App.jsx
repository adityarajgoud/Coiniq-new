import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// === Web3 Imports ===
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiAdapter } from "./context/Web3Config";

// === Page Imports ===
import HomePage from "./pages/HomePage";
import TrendingPage from "./pages/TrendingPage";
import WatchlistPage from "./pages/WatchlistPage";
import CoinDetailsPage from "./pages/CoinDetailsPage";
import NewsPage from "./pages/NewsPage";
import About from "./pages/About";
import ComparePage from "./pages/ComparePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import PortfolioPage from "./pages/PortfolioPage";

// === Component Imports ===
import Navbar from "./components/Navbar";
import GlobalLoader from "./components/GlobalLoader";
import AIChatbot from "./components/AIChatbot";

// === Context & Styles ===
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoadingProvider, useGlobalLoading } from "./context/LoadingContext";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

function AppContent() {
  const { isLoading } = useGlobalLoading();

  return (
    <>
      {isLoading && <GlobalLoader />}

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/coin/:id" element={<CoinDetailsPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>

      <AIChatbot />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnHover={false}
        theme="dark"
        hideProgressBar
      />
    </>
  );
}

function App() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <LoadingProvider>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </LoadingProvider>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinCard from "../components/CoinCard";
import { toast } from "react-toastify";
import TrendingCarousel from "../components/TrendingCarousel";
import { useRealTimePrices } from "../hooks/useRealTimePrices";
import HeroSection from "../components/HeroSection";
import { handleAxiosError } from "../utils/handleAxiosError";
import { useGlobalLoading } from "../context/LoadingContext";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("market_cap_desc");
  const [currency, setCurrency] = useState("usd");

  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watchlist")) || [];
    } catch {
      return [];
    }
  });

  const { setIsLoading } = useGlobalLoading();

  useEffect(() => {
    const fetchCoins = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/coins/markets`,
          {
            params: {
              vs_currency: currency,
              order: "market_cap_desc",
              per_page: 50,
              page,
              sparkline: true,
              price_change_percentage: "24h",
            },
          },
        );
        setCoins(res.data);
      } catch (err) {
        handleAxiosError(err, "Failed to fetch coins");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, [page, currency, setIsLoading]);

  useRealTimePrices({ coins, setCoins, currency });

  const toggleWatchlist = (id, name) => {
    const isInList = watchlist.includes(id);
    const updated = isInList
      ? watchlist.filter((c) => c !== id)
      : [...watchlist, id];

    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));

    toast[isInList ? "error" : "success"](
      isInList
        ? `❌ Removed ${name} from Watchlist`
        : `⭐ Added ${name} to Watchlist`,
    );
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()),
  );

  const manuallySorted = [...filteredCoins].sort((a, b) => {
    if (sortType === "price_desc") return b.current_price - a.current_price;
    if (sortType === "price_asc") return a.current_price - b.current_price;
    if (sortType === "market_cap_desc") return b.market_cap - a.market_cap;
    if (sortType === "market_cap_asc") return a.market_cap - b.market_cap;
    return 0;
  });

  // Smooth scroll handler helper
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-layout">
      <div className="container p-4">
        <HeroSection />

        <div id="trending" style={{ marginBottom: "2rem" }}>
          <TrendingCarousel currency={currency} />
        </div>

        <input
          type="text"
          placeholder="Search Coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 input-glow"
        />

        <div className="flex items-center justify-between mb-4 responsive-flex">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="input-glow"
          >
            <option value="market_cap_desc">Market Cap ↓</option>
            <option value="market_cap_asc">Market Cap ↑</option>
            <option value="price_desc">Price ↓</option>
            <option value="price_asc">Price ↑</option>
          </select>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="input-glow"
          >
            <option value="usd">USD ($)</option>
            <option value="inr">INR (₹)</option>
            <option value="eur">EUR (€)</option>
          </select>
        </div>

        <div className="coin-grid">
          {manuallySorted.slice(0, 12).map((coin) => (
            <CoinCard
              key={coin.id}
              coin={coin}
              isInWatchlist={watchlist.includes(coin.id)}
              toggleWatchlist={() => toggleWatchlist(coin.id, coin.name)}
              currency={currency}
            />
          ))}
        </div>

        {/* Professional Minimalist Pagination Module */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "3rem",
            width: "100%",
          }}
        >
          <button
            className="cool-btn"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            style={{
              padding: "0.5rem 1rem",
              opacity: page === 1 ? 0.4 : 1,
              cursor: page === 1 ? "not-allowed" : "pointer",
            }}
          >
            Prev
          </button>

          {/* Render Active Window Pages around current selection context */}
          {page > 2 && (
            <button
              className="input-glow"
              onClick={() => handlePageChange(1)}
              style={{ minWidth: "40px", padding: "0.5rem", border: "none" }}
            >
              1
            </button>
          )}
          {page > 3 && (
            <span style={{ color: "#71717a", padding: "0 0.25rem" }}>...</span>
          )}

          {page > 1 && (
            <button
              className="input-glow"
              onClick={() => handlePageChange(page - 1)}
              style={{ minWidth: "40px", padding: "0.5rem", border: "none" }}
            >
              {page - 1}
            </button>
          )}

          {/* Current Page Highlighted Frame */}
          <button
            className="cool-btn"
            style={{
              minWidth: "40px",
              padding: "0.5rem",
              background: "var(--accent-color)",
              color: "#000",
              boxShadow: "0 0 12px var(--accent-color)",
            }}
          >
            {page}
          </button>

          <button
            className="input-glow"
            onClick={() => handlePageChange(page + 1)}
            style={{ minWidth: "40px", padding: "0.5rem", border: "none" }}
          >
            {page + 1}
          </button>

          <button
            className="input-glow"
            onClick={() => handlePageChange(page + 2)}
            style={{ minWidth: "40px", padding: "0.5rem", border: "none" }}
          >
            {page + 2}
          </button>

          <span style={{ color: "#71717a", padding: "0 0.25rem" }}>...</span>

          <button
            className="cool-btn"
            onClick={() => handlePageChange(page + 1)}
            style={{ padding: "0.5rem 1rem" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

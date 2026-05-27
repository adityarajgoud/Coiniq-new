import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  X,
  Search,
  DollarSign,
  PieChart,
} from "lucide-react";

function PortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [prices, setPrices] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [qty, setQty] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("coiniq_portfolio")) || [];
    setPortfolio(saved);
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=false",
      );

      setMarketData(data);

      const priceMap = {};
      data.forEach((coin) => (priceMap[coin.id] = coin.current_price));
      setPrices(priceMap);
    } catch (err) {
      console.error("Market fetch error", err);
    }
  };

  const handleAddAsset = () => {
    if (!selectedCoin || !qty || !buyPrice) return;

    const newItem = {
      id: selectedCoin.id,
      name: selectedCoin.name,
      symbol: selectedCoin.symbol,
      image: selectedCoin.image,
      qty: Number(qty),
      buyPrice: Number(buyPrice),
    };

    const updated = [...portfolio, newItem];
    setPortfolio(updated);
    localStorage.setItem("coiniq_portfolio", JSON.stringify(updated));
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedCoin(null);
    setSearch("");
    setQty("");
    setBuyPrice("");
  };

  const totalValue = portfolio.reduce(
    (acc, curr) => acc + curr.qty * (prices[curr.id] || 0),
    0,
  );

  const totalCost = portfolio.reduce(
    (acc, curr) => acc + curr.qty * curr.buyPrice,
    0,
  );

  const netProfit = totalValue - totalCost;
  const profitPercent = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div
      className="portfolio-container page-layout"
      style={{ width: "100%", boxSizing: "border-box" }}
    >
      <div
        className="container p-4"
        style={{ width: "100%", boxSizing: "border-box" }}
      >
        {/* Clean, Modern Header Layout Block */}
        <div
          className="mb-8"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Top Row: Visual Title and Button aligned on desktop */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2 style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>
              Asset <span className="text-gold">Portfolio</span>
            </h2>

            <button
              onClick={() => setShowModal(true)}
              className="add-portfolio-btn"
              style={{
                width: "auto",
                minWidth: "140px",
                padding: "0 1.5rem",
                boxSizing: "border-box",
                height: "46px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: "700",
                margin: 0,
              }}
            >
              <Plus size={16} /> Add Asset
            </button>
          </div>

          {/* Bottom Row: Dynamic Metric Cards Grid Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              className="stat-card"
              style={{ margin: 0, boxSizing: "border-box" }}
            >
              <p className="stat-label">Total Balance</p>
              <h2
                className="stat-value"
                style={{
                  wordBreak: "break-all",
                  fontSize: "1.75rem",
                  margin: "0.25rem 0 0",
                }}
              >
                $
                {totalValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </h2>
            </div>

            <div
              className="stat-card"
              style={{ margin: 0, boxSizing: "border-box" }}
            >
              <p className="stat-label">Net Profit/Loss</p>
              <h2
                className={`stat-value ${netProfit >= 0 ? "text-up" : "text-down"}`}
                style={{
                  wordBreak: "break-all",
                  fontSize: "1.75rem",
                  margin: "0.25rem 0 0",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                }}
              >
                {netProfit >= 0 ? "+" : ""}$
                {Math.abs(netProfit).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
                <span
                  className="ml-2 text-sm font-normal"
                  style={{ color: "#a1a1aa" }}
                >
                  ({profitPercent.toFixed(2)}%)
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* Assets Holdings Matrix Box Container with Swipe Scroll Fix */}
        <div
          className="holdings-wrapper glass-panel"
          style={{
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            boxSizing: "border-box",
          }}
        >
          <table
            className="holdings-table"
            style={{ minWidth: "600px", width: "100%" }}
          >
            <thead>
              <tr>
                <th>Asset</th>
                <th>Price</th>
                <th>Holdings</th>
                <th>Profit/Loss</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {portfolio.map((asset, i) => {
                const currentP = prices[asset.id] || 0;
                const pNL = (currentP - asset.buyPrice) * asset.qty;

                return (
                  <tr key={i}>
                    <td className="flex-cell">
                      <img
                        src={asset.image}
                        alt=""
                        className="coin-icon-small"
                      />
                      <div>
                        <p className="text-base font-semibold">{asset.name}</p>
                        <span className="text-xs tracking-wider uppercase text-zinc-500">
                          {asset.symbol}
                        </span>
                      </div>
                    </td>

                    <td className="text-base font-medium">
                      ${currentP.toLocaleString()}
                    </td>

                    <td>
                      <p className="text-base font-semibold">
                        ${(currentP * asset.qty).toLocaleString()}
                      </p>
                      <span className="text-xs text-zinc-500">
                        {asset.qty} {asset.symbol.toUpperCase()}
                      </span>
                    </td>

                    <td
                      className={`text-base font-semibold ${pNL >= 0 ? "text-up" : "text-down"}`}
                    >
                      {pNL >= 0 ? "+" : ""}${Math.abs(pNL).toFixed(2)}
                    </td>

                    <td>
                      <button
                        onClick={() => {
                          const updated = portfolio.filter(
                            (_, idx) => idx !== i,
                          );
                          setPortfolio(updated);
                          localStorage.setItem(
                            "coiniq_portfolio",
                            JSON.stringify(updated),
                          );
                        }}
                        className="delete-btn"
                        style={{ padding: "0.5rem" }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal Entry Popup Screen Container - Fluid Mobile Wrapping */}
        {showModal && (
          <div
            className="modal-backdrop"
            style={{ padding: "1rem", boxSizing: "border-box" }}
          >
            <div
              className="p-6 modal-content glass-card"
              style={{
                width: "100%",
                maxWidth: "450px",
                maxHeight: "90vh",
                overflowY: "auto",
                boxSizing: "border-box",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Add Transaction</h2>
                <X
                  className="transition cursor-pointer text-zinc-400 hover:text-white"
                  onClick={() => setShowModal(false)}
                />
              </div>

              {!selectedCoin ? (
                <div
                  className="search-section"
                  style={{ width: "100%", boxSizing: "border-box" }}
                >
                  <div
                    className="search-input-wrapper"
                    style={{ width: "100%", boxSizing: "border-box" }}
                  >
                    <Search size={18} className="text-zinc-500" />
                    <input
                      placeholder="Search coin name (e.g. Bitcoin)"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ width: "100%", boxSizing: "border-box" }}
                    />
                  </div>

                  <div
                    className="search-results custom-scroll"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {marketData
                      .filter((c) =>
                        c.name.toLowerCase().includes(search.toLowerCase()),
                      )
                      .map((coin) => (
                        <div
                          key={coin.id}
                          className="text-sm font-medium search-item"
                          onClick={() => setSelectedCoin(coin)}
                          style={{ boxSizing: "border-box" }}
                        >
                          <img src={coin.image} alt="" className="w-6 h-6" />
                          <span>{coin.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div
                  className="form-section animate-fade"
                  style={{ width: "100%", boxSizing: "border-box" }}
                >
                  <div
                    className="flex items-center gap-3 p-3 mb-6 border bg-zinc-800/40 rounded-xl border-zinc-800"
                    style={{ flexWrap: "wrap", boxSizing: "border-box" }}
                  >
                    <img src={selectedCoin.image} className="w-8 h-8" alt="" />
                    <span
                      className="text-base font-semibold text-white"
                      style={{ wordBreak: "break-word" }}
                    >
                      {selectedCoin.name} Selected
                    </span>
                    <button
                      onClick={() => setSelectedCoin(null)}
                      className="ml-auto text-xs font-semibold text-accent hover:underline"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Change
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      marginBottom: "1.5rem",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      className="input-group"
                      style={{ width: "100%", boxSizing: "border-box" }}
                    >
                      <label className="mb-2 text-xs font-semibold tracking-wider uppercase text-zinc-400">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="text-sm font-medium"
                        style={{ width: "100%", boxSizing: "border-box" }}
                      />
                    </div>

                    <div
                      className="input-group"
                      style={{ width: "100%", boxSizing: "border-box" }}
                    >
                      <label className="mb-2 text-xs font-semibold tracking-wider uppercase text-zinc-400">
                        Buy Price
                      </label>
                      <input
                        type="number"
                        value={buyPrice}
                        onChange={(e) => setBuyPrice(e.target.value)}
                        placeholder={selectedCoin.current_price}
                        className="text-sm font-medium"
                        style={{ width: "100%", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleAddAsset}
                    className="text-sm font-bold tracking-wider submit-portfolio-btn"
                    style={{ width: "100%", boxSizing: "border-box" }}
                  >
                    Add to Portfolio
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PortfolioPage;

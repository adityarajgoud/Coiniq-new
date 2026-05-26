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
    <div className="portfolio-container page-layout">
      <div className="container p-4">
        {/* Metric Cards Banner Grid */}
        <div className="mb-8 stats-row">
          <div className="stat-card">
            <p className="stat-label">Total Balance</p>
            <h2 className="stat-value">
              $
              {totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h2>
          </div>

          <div className="stat-card">
            <p className="stat-label">Net Profit/Loss</p>
            <h2
              className={`stat-value ${netProfit >= 0 ? "text-up" : "text-down"}`}
            >
              {netProfit >= 0 ? "+" : ""}$
              {Math.abs(netProfit).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
              <span className="ml-2 text-sm font-normal">
                ({profitPercent.toFixed(2)}%)
              </span>
            </h2>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="add-portfolio-btn"
          >
            <Plus size={18} /> Add Asset
          </button>
        </div>

        {/* Assets Holdings Matrix Table Panel */}
        <div className="holdings-wrapper glass-panel">
          <table className="holdings-table">
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
                        <span className="text-xs tracking-wider text-zinc-500">
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

        {/* Modal Entry Popup Screen Container */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="p-6 modal-content glass-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Add Transaction</h2>
                <X
                  className="transition cursor-pointer text-zinc-400 hover:text-white"
                  onClick={() => setShowModal(false)}
                />
              </div>

              {!selectedCoin ? (
                <div className="search-section">
                  <div className="search-input-wrapper">
                    <Search size={18} className="text-zinc-500" />
                    <input
                      placeholder="Search coin name (e.g. Bitcoin)"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="search-results custom-scroll">
                    {marketData
                      .filter((c) =>
                        c.name.toLowerCase().includes(search.toLowerCase()),
                      )
                      .map((coin) => (
                        <div
                          key={coin.id}
                          className="text-sm font-medium search-item"
                          onClick={() => setSelectedCoin(coin)}
                        >
                          <img src={coin.image} alt="" className="w-6 h-6" />
                          <span>{coin.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="form-section animate-fade">
                  <div className="flex items-center gap-3 p-3 mb-6 border bg-zinc-800/40 rounded-xl border-zinc-800">
                    <img src={selectedCoin.image} className="w-8 h-8" alt="" />
                    <span className="text-base font-semibold text-white">
                      {selectedCoin.name} Selected
                    </span>
                    <button
                      onClick={() => setSelectedCoin(null)}
                      className="ml-auto text-xs font-semibold text-accent hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="input-group">
                      <label className="mb-2 text-xs font-semibold tracking-wider ">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="text-sm font-medium"
                      />
                    </div>

                    <div className="input-group">
                      <label className="mb-2 text-xs font-semibold tracking-wider ">
                        Buy Price
                      </label>
                      <input
                        type="number"
                        value={buyPrice}
                        onChange={(e) => setBuyPrice(e.target.value)}
                        placeholder={selectedCoin.current_price}
                        className="text-sm font-medium"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleAddAsset}
                    className="text-sm font-bold tracking-wider submit-portfolio-btn"
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

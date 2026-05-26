import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { handleAxiosError } from "../utils/handleAxiosError";
import { useGlobalLoading } from "../context/LoadingContext";
import api from "../utils/axiosInstance";
import "../styles/utilities.css";

function ComparePage() {
  const [coins, setCoins] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");

  const symbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const { setIsLoading } = useGlobalLoading();

  const fetchCoins = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/coins/markets`, {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
        },
      });
      setCoins(res.data);
    } catch (err) {
      handleAxiosError(err, "Failed to load coin list");
    } finally {
      setIsLoading(false);
    }
  }, [currency, setIsLoading]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const fetchSelectedCoinDetails = useCallback(
    async (selected) => {
      setIsLoading(true);
      try {
        const coinDetails = await Promise.all(
          selected.map((coin) =>
            api
              .get(`/coins/${coin.value}`)
              .then((res) => res.data)
              .catch((err) => {
                handleAxiosError(err, `Failed to load ${coin.label}`);
                return null;
              }),
          ),
        );

        const filtered = coinDetails.filter(Boolean);
        setSelectedCoins(filtered);
      } catch (err) {
        handleAxiosError(err, "Failed to load selected coin details");
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading],
  );

  const handleSelect = async (selected) => {
    if (selected.length > 2) {
      toast.error("⚠️ You can compare a maximum of 2 coins.");
      return;
    }

    setSelectedOptions(selected);
    await fetchSelectedCoinDetails(selected);
  };

  useEffect(() => {
    if (selectedOptions.length === 0) return;

    const timeout = setTimeout(() => {
      fetchSelectedCoinDetails(selectedOptions);
    }, 15000);

    return () => clearTimeout(timeout);
  }, [selectedOptions, fetchSelectedCoinDetails]);

  // Custom styling block to inject simple professional dark mode options into the dropdown
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1e1e1e",
      borderColor: "#333",
      color: "#fff",
      boxShadow: "0 0 5px rgba(0, 255, 204, 0.2)",
      "&:hover": {
        borderColor: "#00ffcc",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1a1a1a",
      border: "1px solid #333",
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#2d2d2d" : "#1a1a1a",
      color: "#fff",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#2d2d2d",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#2d2d2d",
      borderRadius: "6px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ff4f4f",
      "&:hover": {
        backgroundColor: "rgba(255, 79, 79, 0.1)",
        color: "#ff4f4f",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#71717a",
    }),
  };

  return (
    <div className="page-layout">
      <div
        className="container p-4 compare-page"
        style={{ overflow: "visible" }}
      >
        <h2 className="mb-4 text-2xl text-accent">🔍 Compare Coins</h2>

        <div
          className="compare-controls"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="input-glow"
          >
            <option value="usd">USD ($)</option>
            <option value="inr">INR (₹)</option>
            <option value="eur">EUR (€)</option>
          </select>

          <div
            className="select-wrapper"
            style={{ flex: 1, minWidth: 200, zIndex: 999 }}
          >
            <Select
              isMulti
              value={selectedOptions}
              onChange={handleSelect}
              options={coins.map((coin) => ({
                value: coin.id,
                label: `${coin.name} (${coin.symbol.toUpperCase()})`,
              }))}
              placeholder="Select up to 2 coins..."
              styles={
                customSelectStyles
              } /* Link the custom theme variable here */
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
          </div>
        </div>

        <div className="compare-grid fade-in">
          {selectedCoins.map((coin) => (
            <div key={coin.id} className="compare-card">
              <img
                src={coin.image?.large}
                alt={coin.name}
                loading="lazy"
                style={{ height: 60 }}
              />

              <h3 className="text-gold">{coin.name}</h3>

              <span className="badge badge-glow">
                {coin.categories?.[0] || "Uncategorized"}
              </span>

              <span className="badge rank-badge">
                Rank #{coin.market_cap_rank || "?"}
              </span>

              <p className="mt-2 text-sm">
                {coin.description?.en
                  ? coin.description.en.split(".")[0] + "."
                  : "No description available."}
              </p>
            </div>
          ))}
        </div>

        {selectedCoins.length > 0 && (
          <table className="compare-table fade-in responsive-table">
            <thead>
              <tr>
                <th>Metric</th>
                {selectedCoins.map((coin) => (
                  <th key={coin.id}>{coin.name}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Price</td>
                {selectedCoins.map((coin) => (
                  <td key={coin.id}>
                    {symbol}
                    {coin.market_data?.current_price?.[
                      currency
                    ]?.toLocaleString() || "N/A"}
                  </td>
                ))}
              </tr>

              <tr>
                <td>Market Cap</td>
                {selectedCoins.map((coin) => (
                  <td key={coin.id}>
                    {symbol}
                    {coin.market_data?.market_cap?.[
                      currency
                    ]?.toLocaleString() || "N/A"}
                  </td>
                ))}
              </tr>

              <tr>
                <td>Volume (24h)</td>
                {selectedCoins.map((coin) => (
                  <td key={coin.id}>
                    {symbol}
                    {coin.market_data?.total_volume?.[
                      currency
                    ]?.toLocaleString() || "N/A"}
                  </td>
                ))}
              </tr>

              <tr>
                <td>Change (24h)</td>
                {selectedCoins.map((coin) => (
                  <td
                    key={coin.id}
                    style={{
                      color:
                        coin.market_data?.price_change_percentage_24h >= 0
                          ? "lightgreen"
                          : "salmon",
                    }}
                  >
                    {coin.market_data?.price_change_percentage_24h?.toFixed(
                      2,
                    ) ?? "0.00"}
                    %
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ComparePage;

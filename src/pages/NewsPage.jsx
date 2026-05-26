import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { handleAxiosError } from "../utils/handleAxiosError";
import { useGlobalLoading } from "../context/LoadingContext";
import "../styles/utilities.css";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const { setIsLoading } = useGlobalLoading();

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/coins/news`,
        {
          params: { page },
        },
      );

      const articles = Array.isArray(res.data) ? res.data : [];
      setNews((prev) => [...prev, ...articles]);
    } catch (err) {
      handleAxiosError(err, "Failed to fetch crypto news");
    } finally {
      setIsLoading(false);
    }
  }, [page, setIsLoading]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="page-layout">
      <div className="container p-4">
        <h2 className="mb-4 text-2xl text-accent">📰 Latest Crypto News</h2>

        <div className="news-grid fade-in">
          {news.map((item, index) => (
            <div key={index} className="news-card">
              <a
                href={item.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{item.title || "No Title Available"}</h3>

                <p className="text-sm">
                  {item.source?.name || "Unknown Source"} •{" "}
                  {item.publishedAt
                    ? item.publishedAt.slice(0, 10)
                    : "Unknown Date"}
                </p>

                <p className="mt-1 text-sm">
                  {item.description
                    ? item.description.slice(0, 100) + "..."
                    : "No description available."}
                </p>
              </a>
            </div>
          ))}
        </div>

        {news.length > 0 && (
          <div className="mt-6 text-center">
            <button
              className="cool-btn neutral-btn"
              onClick={() => setPage((p) => p + 1)}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsPage;

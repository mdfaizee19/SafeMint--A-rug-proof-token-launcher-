// src/pages/TokenList.jsx
import React, { useEffect, useState } from "react";
import SkeletonCard from "../components/SkeletonCard";
import TokenCard from "../components/TokenCard";
import { INDEXER_URL } from "../config";

export default function TokenList() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState("newest");

  async function loadTokens() {
    try {
      setLoading(true);
      const res = await fetch(`${INDEXER_URL}/tokens`);
      const list = await res.json();
      setTokens(list);
    } catch (err) {
      console.error("Failed to fetch tokens", err);
    } finally {
      setLoading(false);
    }
  }

  /* Auto-load */
  useEffect(() => {
    loadTokens();
  }, []);

  /* ---- Optimistic Refresh ---- */
  useEffect(() => {
    function handleNewToken(e) {
      setTokens((prev) => [e.detail, ...prev]);
    }
    window.addEventListener("token-launched", handleNewToken);
    return () => window.removeEventListener("token-launched", handleNewToken);
  }, []);

  /* ---- Sorting ---- */
  const sorted = [...tokens].sort((a, b) => {
    if (sortMode === "newest") return (b.timestamp || 0) - (a.timestamp || 0);
    if (sortMode === "locked") return (b.lockMonths || 0) - (a.lockMonths || 0);
    if (sortMode === "trust") return (b.trustScore || 0) - (a.trustScore || 0);
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Explore Tokens</h1>

        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}
          className="p-2 bg-white/10 border border-white/20 rounded-xl"
        >
          <option value="newest">Newest</option>
          <option value="locked">Most Locked</option>
          <option value="trust">Highest Trust</option>
        </select>
      </div>

      {/* Token Grid */}
      <div className="grid grid-cols-3 gap-6">
        {loading
          ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          : sorted.map((token) => <TokenCard key={token.tokenAddress} token={token} />)}
      </div>
    </div>
  );
}


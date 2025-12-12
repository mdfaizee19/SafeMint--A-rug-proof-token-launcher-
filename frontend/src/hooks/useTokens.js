// hooks/useTokens.js
import { useEffect, useState } from "react";

export function useTokens() {
  const [tokens, setTokens] = useState(() => {
    try {
      const raw = localStorage.getItem("safemint_tokens_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(tokens.length === 0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_INDEXER_URL || "http://localhost:4000"}/tokens`);
        const data = await res.json();
        if (!cancelled) {
          setTokens(data || []);
          localStorage.setItem("safemint_tokens_v1", JSON.stringify(data || []));
        }
      } catch (err) {
        console.error("useTokens load failed", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    const iv = setInterval(load, 5000); // background refresh
    return () => { cancelled = true; clearInterval(iv); };
  }, []);

  return { tokens, loading, refresh: () => {} };
}

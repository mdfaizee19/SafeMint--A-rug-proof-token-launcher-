export async function fetchTokens() {
  try {
    const res = await fetch(`${import.meta.env.VITE_INDEXER_URL || "http://localhost:4000"}/tokens`);
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.warn("fetchTokens failed", e);
    return [];
  }
}

export async function fetchToken(address) {
  try {
    const res = await fetch(`${import.meta.env.VITE_INDEXER_URL || "http://localhost:4000"}/tokens/${address}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn("fetchToken failed", e);
    return null;
  }
}

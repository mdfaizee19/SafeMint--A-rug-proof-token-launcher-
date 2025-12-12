// frontend/src/services/indexerApi.js
import { INDEXER_URL } from "../config";

export async function getAllTokens() {
  const res = await fetch(`${INDEXER_URL}/tokens`);
  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }
  return await res.json();
}

export async function getToken(address) {
  const res = await fetch(`${INDEXER_URL}/tokens/${address}`);
  if (!res.ok) {
    throw new Error("Failed to fetch token");
  }
  return await res.json();
}


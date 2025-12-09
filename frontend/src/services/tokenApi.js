// frontend/src/services/tokenApi.js
import axios from "axios";
import { ethers } from "ethers";
import { LAUNCHPAD_ADDRESS } from "../config";
import { LAUNCHPAD_ABI } from "./launchAbi";

const INDEXER_URL = import.meta.env.VITE_INDEXER_URL || "http://localhost:4000"; // change in .env

export async function fetchTokens() {
  // Try indexer first, fall back to static file
  try {
    const res = await axios.get(`${INDEXER_URL}/tokens`, { timeout: 5000 });
    return res.data;
  } catch (e) {
    // fallback to public launches.json
    const res = await axios.get("/launches.json");
    return res.data;
  }
}

// optional: read trustScore on-chain for a token
export async function fetchOnchainTrustScore(tokenAddress) {
  if (!window.ethereum) return null;
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(LAUNCHPAD_ADDRESS, LAUNCHPAD_ABI, provider);
  try {
    const score = await contract.trustScore(tokenAddress);
    return Number(score);
  } catch (e) {
    console.warn("trustScore read failed", e);
    return null;
  }
}

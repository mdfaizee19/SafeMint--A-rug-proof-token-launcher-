// wallet.js - tiny helper (ethers v6)
import { ethers } from "ethers";

export async function connectWallet() {
  if (!window.ethereum?.request) throw new Error("No injected wallet");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const addr = await signer.getAddress();
  return { provider, signer, address: addr };
}

export async function getSignerIfAvailable() {
  if (!window.ethereum?.request) return null;
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider.getSigner();
}
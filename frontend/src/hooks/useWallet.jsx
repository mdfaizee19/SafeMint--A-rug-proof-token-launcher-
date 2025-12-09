import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function useWallet() {
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.ethereum) {
      const p = new ethers.BrowserProvider(window.ethereum);
      setProvider(p);

      // read current accounts (if already connected)
      (async () => {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts && accounts.length > 0) setAddress(accounts[0]);
          const network = await p.getNetwork();
          setChainId(network.chainId);
        } catch (e) { /* ignore */ }
      })();

      window.ethereum.on?.("accountsChanged", (accounts) => {
        setAddress(accounts[0] || "");
      });
      window.ethereum.on?.("chainChanged", async () => {
        const n = await new ethers.BrowserProvider(window.ethereum).getNetwork();
        setChainId(n.chainId);
      });
    }
  }, []);

  const connect = async () => {
    if (!window.ethereum) throw new Error("Install QIE Wallet / MetaMask");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const p = new ethers.BrowserProvider(window.ethereum);
    setProvider(p);
    const s = await p.getSigner();
    const addr = await s.getAddress();
    setAddress(addr);
    return addr;
  };

  return { address, provider, chainId, connect };
}

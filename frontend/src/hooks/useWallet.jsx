// src/hooks/useWallet.jsx
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window.ethereum || window.qie)) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum || window.qie);
      setProvider(web3Provider);

      // auto-detect accounts if already connected
      (async () => {
        try {
          const accounts = await web3Provider.send("eth_accounts", []);
          if (accounts && accounts.length) {
            const s = web3Provider.getSigner();
            setSigner(s);
            setAccount(accounts[0]);
            const net = await web3Provider.getNetwork();
            setNetwork(net);
          }
        } catch (e) {
          // ignore
        }
      })();

      // account / chain changed events
      if (window.ethereum) {
        window.ethereum.on?.("accountsChanged", (accs) => {
          setAccount(accs[0] || null);
          if (!accs.length) setSigner(null);
        });
        window.ethereum.on?.("chainChanged", async () => {
          const net = await web3Provider.getNetwork();
          setNetwork(net);
        });
      }
    }
  }, []);

  async function connect() {
    if (! (window.ethereum || window.qie) ) throw new Error("Wallet not injected");
    const web3Provider = new ethers.BrowserProvider(window.ethereum || window.qie);
    await web3Provider.send("eth_requestAccounts", []);
    const s = web3Provider.getSigner();
    setProvider(web3Provider);
    setSigner(s);
    const acc = await s.getAddress();
    setAccount(acc);
    const net = await web3Provider.getNetwork();
    setNetwork(net);
    return { provider: web3Provider, signer: s, account: acc, network: net };
  }

  return { provider, signer, account, network, connect };
}

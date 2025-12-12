import React, { useEffect, useState } from "react";

export default function NavBar({ onOpenLaunch }) {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Wallet injection stub — if QIE wallet injects provider, listen
    if (window.ethereum?.request) {
      window.ethereum.request({ method: "eth_accounts" }).then((acc = []) => {
        if (acc && acc.length) setAccount(acc[0]);
      }).catch(() => {});
      // listen for connect
      window.ethereum?.on?.("accountsChanged", (acc) => {
        setAccount(acc?.[0] || null);
      });
    }
  }, []);

  async function connect() {
    if (!window.ethereum?.request) {
      alert("No wallet detected. Use QIE Wallet or MetaMask-like provider.");
      return;
    }
    try {
      const acc = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(acc?.[0] || null);
    } catch (e) { console.error(e); }
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        <div className="logo">SafeMint<span className="accent">™</span></div>
        <div className="nav-links">
          <a href="/">Launches</a>
          <a href="#discover">Discover</a>
          <a href="#analytics">Analytics</a>
        </div>
      </div>

      <div className="nav-right">
        <button className="btn" onClick={onOpenLaunch}>🚀 Launch Token</button>
        <button className="btn outline" onClick={connect}>
          {account ? `${account.slice(0,6)}...${account.slice(-4)}` : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
}
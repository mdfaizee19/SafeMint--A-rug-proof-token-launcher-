// src/components/WalletConnect.jsx
import { useEffect } from "react";
import { useWallet } from "../hooks/useWallet";

export default function WalletConnect() {
  const { account, connect } = useWallet();

  useEffect(() => {
    // no-op, hook sets up injection listeners
  }, []);

  return (
    <div>
      {account ? (
        <div className="px-3 py-1 rounded-md bg-green-800/30">{account}</div>
      ) : (
        <button
          className="px-3 py-2 bg-cyan-500 rounded-md text-black font-semibold"
          onClick={() => connect().catch((e) => alert("Wallet connect failed: " + e.message))}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

import React from "react";

export default function Header({ address, onConnect }) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-400">
          SafeMint
        </h1>
        <div className="text-sm text-gray-400">Rug-proof Token Launcher</div>
      </div>

      <div>
        {!address ? (
          <button onClick={onConnect} className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg text-white">
            Connect Wallet
          </button>
        ) : (
          <div className="px-4 py-2 bg-white/6 rounded-full font-mono text-sm">{address.slice(0,6)}...{address.slice(-4)}</div>
        )}
      </div>
    </header>
  );
}


import React from "react";
import { Link } from "react-router-dom";
import TrustBadge from "./TrustBadge";

export default function TokenCard({ token }) {
  const image = token.imageCid 
    ? `https://ipfs.io/ipfs/${token.imageCid}`
    : "/placeholder.png";

  return (
    <Link
      to={`/token/${token.token}`}
      className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition"
    >
      {/* Image */}
      <div className="h-32 w-full bg-white/10 rounded-xl overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Name */}
      <div className="mt-3 text-lg font-semibold text-white">
        {token.name || "Unnamed"}
      </div>

      {/* Symbol + Trust Badge */}
      <div className="flex items-center justify-between mt-2 text-gray-300">
        <span>{token.symbol}</span>
        <TrustBadge score={token.trustScore || 2} />
        { token.withdrawn && <span className="text-xs bg-gray-700 px-2 py-1 rounded">Withdrawn</span> }

      </div>
    </Link>
  );
}


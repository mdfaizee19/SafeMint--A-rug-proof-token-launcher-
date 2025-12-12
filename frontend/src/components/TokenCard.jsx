import React from "react";
import { IPFS_GATEWAY } from "../config";
import TrustBadge from "./TrustBadge";
import Sparkline from "./Sparkline";
import { Link } from "react-router-dom";

export default function TokenCard({ token = {} }) {
  // defensive normalisation
  const addr = token.tokenAddress || token.address || "0xUNKNOWN";
  const liquidity = Number(token.liquidityQIE || 0);
  const supply = Number(token.totalSupply || token.totalSupply || 0);
  const name = token.name || token.symbol || addr.slice(0,8);

  const image = token.imageCid ? IPFS_GATEWAY(token.imageCid) : null;

  return (
    <Link to={`/token/${addr}`} className="card token-card">
      <div className="card-left">
        <div className="avatar">{image ? <img src={image} alt={name} /> : <div className="avatar-fallback">{name[0]}</div>}</div>
        <div className="meta">
          <div className="title">{name}</div>
          <div className="subtitle">{addr}</div>
        </div>
      </div>

      <div className="card-mid">
        <Sparkline data={[5,10,6,9,15,8,12]} />
        <div className="liquidity">{isNaN(liquidity) ? "—" : `${liquidity.toFixed(2)} QIE`}</div>
      </div>

      <div className="card-right">
        <TrustBadge token={token} />
      </div>
    </Link>
  );
}
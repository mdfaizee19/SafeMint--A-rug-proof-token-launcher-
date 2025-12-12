import React from "react";

/**
 * Trust rules:
 * green => unlockTime in future AND trustScore >=2 && no premine
 * yellow => trustScore == 1
 * red => trustScore == 0 OR unlockTime in past
 */
export default function TrustBadge({ token = {} }) {
  const unlockTime = Number(token.unlockTime || token.unlock || 0);
  const trustScore = Number(token.trustScore ?? 1);

  let color = "yellow";
  const now = Math.floor(Date.now()/1000);

  if (unlockTime > now && trustScore >= 2) color = "green";
  if (unlockTime <= now || trustScore === 0) color = "red";

  const label = color === "green" ? "Safe" : color === "yellow" ? "Caution" : "Risk";

  return (
    <div className={`trust-badge trust-${color}`}>
      <div className="dot" />
      <div className="label">{label}</div>
    </div>
  );
}
// src/utils/trust.js
export function computeTrust(token) {
  // token.unlockTime (seconds), token.totalSupply, token.owner, token.liquidityQIE
  const now = Math.floor(Date.now()/1000);
  let score = 50; // 0-100

  // liquidity lock bonus
  if (token.unlockTime && token.unlockTime > now) score += 30;

  // large liquidity boosts trust
  const liq = Number(token.liquidityQIE || 0);
  if (liq >= 1000) score += 10;
  else if (liq >= 200) score += 5;

  // premine detection: if owner's balance >> supply (we must rely on indexer data)
  if (token.owner && token.ownerPremineRatio) {
    if (token.ownerPremineRatio > 0.5) score -= 40;
    else if (token.ownerPremineRatio > 0.2) score -= 15;
  }

  // clamp
  score = Math.max(0, Math.min(100, score));
  return score;
}

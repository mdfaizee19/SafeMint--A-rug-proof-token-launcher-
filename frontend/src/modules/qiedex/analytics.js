// QIEDEX MASTER BUILDER CORE ENGINE
// Provides analytics, volatility, price model, liquidity score, heat maps

export function computeVolatility(history) {
  if (!history || history.length < 2) return 0;
  let sum = 0;
  for (let i = 1; i < history.length; i++) {
    sum += Math.abs(history[i] - history[i - 1]);
  }
  return Number((sum / (history.length - 1)).toFixed(2));
}

export function computeLiquidityStrength(liq) {
  if (!liq) return "LOW";
  if (liq > 1000) return "HIGH";
  if (liq > 300) return "MEDIUM";
  return "LOW";
}

export function generateDepthMap(liq) {
  // visual depth blocks
  if (!liq) return "█▒▒▒▒";
  if (liq > 1000) return "█████";
  if (liq > 500) return "████▒";
  if (liq > 200) return "███▒▒";
  return "██▒▒▒";
}

export function computeScore(history, liquidity, trustScore) {
  const vol = computeVolatility(history);
  const liqStr = computeLiquidityStrength(liquidity);
  let score = trustScore;

  // volatility reduces score
  if (vol > 20) score -= 10;
  if (vol <= 5) score += 10;

  // liquidity boosts
  if (liqStr === "HIGH") score += 15;
  if (liqStr === "MEDIUM") score += 5;

  return Math.max(0, Math.min(100, score));
}
